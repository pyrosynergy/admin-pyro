const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// @route   GET /api/verify/:token
// @desc    Public employee verification, by token or by short employee-id
//          form "e<digits>" (e.g. /api/verify/e17 -> empId 00017), which QR
//          codes can encode instead of the full 48-char token. The canonical
//          short form drops leading zeros (empId 00004 -> /api/verify/e4, see
//          utils/links.js), but padded variants like /e04 also resolve.
// @access  Public
router.get('/:token', async (req, res) => {
  try {
    const { token } = req.params;
    let employee = null;
    const shortId = typeof token === 'string' ? token.match(/^e(\d{1,5})$/i) : null;
    if (shortId) {
      employee = await Employee.findOne({ empId: shortId[1].padStart(5, '0') });
    } else if (typeof token === 'string' && /^[a-f0-9]{48}$/.test(token)) {
      employee = await Employee.findOne({ token });
    }
    if (!employee) {
      return res.status(404).json({ success: false, valid: false, message: 'Verification not found' });
    }

    return res.json({
      success: true,
      valid: employee.validity === 'active',
      validity: employee.validity,
      // On short-id lookups, hand back the token so the frontend can
      // redirect to the canonical tokenised URL.
      ...(shortId ? { token: employee.token } : {}),
      employee: {
        empId: employee.empId,
        fullName: employee.fullName,
        designation: employee.designation,
        photoUrl: employee.photoUrl || '',
        issuedOn: employee.issuedOn,
      },
    });
  } catch (err) {
    console.error('Verify error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
