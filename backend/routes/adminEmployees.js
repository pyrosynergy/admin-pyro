const express = require('express');
const crypto = require('crypto');
const mongoose = require('mongoose');
const router = express.Router();
const Employee = require('../models/Employee');
const { requireAuth, requireRole, csrfGuard } = require('../middleware/auth');
const { photoUpload } = require('../middleware/upload');
const { uploadEmployeePhoto } = require('../config/cloudinary');
const {
  validateEmpId,
  normalizeEmpId,
  validateText,
  validateOptionalUrl,
  validateDate,
  validateValidity,
} = require('../utils/validators');
const { buildVerifyLink } = require('../utils/links');

// Every route in this router requires an authenticated admin.
router.use(csrfGuard, requireAuth, requireRole('admin'));

function generateToken() {
  return crypto.randomBytes(24).toString('hex');
}

function findValidationError(checks) {
  for (const error of checks) {
    if (error) return error;
  }
  return null;
}

// @route   GET /api/admin/employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    return res.json({ success: true, employees });
  } catch (err) {
    console.error('List employees error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/admin/employees
// Accepts JSON or multipart/form-data (optional "photo" file field).
// The token is always server-set; any client-supplied value is ignored.
router.post('/', photoUpload, async (req, res) => {
  try {
    const { empId, fullName, designation, photoLink, issuedOn, validity } = req.body || {};

    const error = findValidationError([
      validateEmpId(empId),
      validateText(fullName, 'Full name'),
      validateText(designation, 'Designation'),
      validateOptionalUrl(photoLink, 'Photo link'),
      issuedOn !== undefined && issuedOn !== '' ? validateDate(issuedOn, 'Issued on') : null,
      validateValidity(validity),
    ]);
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    // Upload the photo before touching the DB so a storage failure never
    // leaves a half-created employee.
    let photoUrl = '';
    if (req.file) {
      photoUrl = await uploadEmployeePhoto(req.file.buffer);
    }

    const token = generateToken();
    const employee = await Employee.create({
      empId: normalizeEmpId(empId),
      fullName: fullName.trim(),
      designation: designation.trim(),
      photoLink: photoLink ? photoLink.trim() : '',
      photoUrl,
      issuedOn: issuedOn ? new Date(issuedOn) : new Date(),
      validity,
      token,
      verifyLink: buildVerifyLink(token),
    });

    return res.status(201).json({ success: true, employee });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'An employee with this ID already exists' });
    }
    if (err.statusCode) {
      return res.status(err.statusCode).json({ success: false, message: err.message });
    }
    console.error('Create employee error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/admin/employees/:id
// Accepts JSON or multipart/form-data (optional "photo" file field replaces
// the stored photo). The token is intentionally not editable here.
router.put('/:id', photoUpload, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid employee id' });
    }

    const { empId, fullName, designation, photoLink, issuedOn, validity } = req.body || {};
    const updates = {};

    const checks = [];
    if (empId !== undefined) {
      checks.push(validateEmpId(empId));
      if (typeof empId === 'string') updates.empId = normalizeEmpId(empId);
    }
    if (fullName !== undefined) {
      checks.push(validateText(fullName, 'Full name'));
      updates.fullName = typeof fullName === 'string' ? fullName.trim() : fullName;
    }
    if (designation !== undefined) {
      checks.push(validateText(designation, 'Designation'));
      updates.designation = typeof designation === 'string' ? designation.trim() : designation;
    }
    if (photoLink !== undefined) {
      checks.push(validateOptionalUrl(photoLink, 'Photo link'));
      updates.photoLink = typeof photoLink === 'string' ? photoLink.trim() : '';
    }
    if (issuedOn !== undefined) {
      checks.push(validateDate(issuedOn, 'Issued on'));
      updates.issuedOn = new Date(issuedOn);
    }
    if (validity !== undefined) {
      checks.push(validateValidity(validity));
      updates.validity = validity;
    }

    const error = findValidationError(checks);
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    // Upload only after all field validation passed, so a rejected request
    // never leaves an orphaned image in storage.
    if (req.file) {
      updates.photoUrl = await uploadEmployeePhoto(req.file.buffer);
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'No editable fields provided' });
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    return res.json({ success: true, employee });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'An employee with this ID already exists' });
    }
    if (err.statusCode) {
      return res.status(err.statusCode).json({ success: false, message: err.message });
    }
    console.error('Update employee error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/admin/employees/:id/regenerate-token
// Issues a new token and verify link, invalidating the old one.
router.post('/:id/regenerate-token', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid employee id' });
    }

    const token = generateToken();
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: { token, verifyLink: buildVerifyLink(token) } },
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    return res.json({ success: true, employee });
  } catch (err) {
    console.error('Regenerate token error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
