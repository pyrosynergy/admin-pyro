const mongoose = require('mongoose');
const { buildShortVerifyLink } = require('../utils/links');

const employeeSchema = new mongoose.Schema(
  {
    // Business primary key: 5-digit zero-padded string, unique-indexed.
    // (Legacy records may still hold longer alphanumeric IDs until edited.)
    empId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    // Legacy Google Drive share link (kept for migration reference only;
    // not rendered anywhere — Drive links don't serve raw images).
    photoLink: {
      type: String,
      trim: true,
      maxlength: 2048,
      default: '',
    },
    // Object-storage (Cloudinary) URL set by the server after upload.
    photoUrl: {
      type: String,
      trim: true,
      maxlength: 2048,
      default: '',
    },
    issuedOn: {
      type: Date,
      required: true,
    },
    // Verification state shown on the verify page. Replaces the old
    // "valid until" date + separate status pair (see scripts/migrateValidity.js).
    validity: {
      type: String,
      enum: ['active', 'inactive', 'under-process'],
      required: true,
      default: 'active',
    },
    // Server-generated; never accepted from the client.
    token: {
      type: String,
      required: true,
      unique: true,
    },
    verifyLink: {
      type: String,
      required: true,
    },
  },
  // Virtuals are serialised so the admin UI sees shortVerifyLink.
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Derived, never stored: it must follow empId when a record is edited.
// null for legacy non-numeric IDs, which have no short form.
employeeSchema.virtual('shortVerifyLink').get(function () {
  return buildShortVerifyLink(this.empId);
});

module.exports = mongoose.model('Employee', employeeSchema);
