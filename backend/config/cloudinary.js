// Cloudinary storage for employee photos. Credentials come from env vars
// (CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET);
// uploads fail with a clear error when they are not set.
const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;

function isStorageConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

// Uploads an image buffer and resolves with its https URL. The public id is
// server-generated (never derived from the client filename), and images are
// capped at 800x800 to keep verify-page loads small.
function uploadEmployeePhoto(buffer) {
  if (!isStorageConfigured()) {
    const err = new Error('Photo storage is not configured (missing CLOUDINARY_* env vars)');
    err.statusCode = 500;
    return Promise.reject(err);
  }
  // Configured at call time (not import time) so the SDK always sees the
  // env the process currently has, never values cached during module load.
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'pyrosynergy/employees',
        public_id: crypto.randomBytes(16).toString('hex'),
        resource_type: 'image',
        overwrite: false,
        transformation: [{ width: 800, height: 800, crop: 'limit' }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}

module.exports = { uploadEmployeePhoto, isStorageConfigured };
