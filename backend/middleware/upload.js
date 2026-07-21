// Multer-based photo upload middleware. Memory storage only (the backend
// runs on Vercel serverless — the filesystem is ephemeral, nothing is
// written to disk). Accepts a single optional "photo" field.
const multer = require('multer');

const MAX_PHOTO_BYTES = 4 * 1024 * 1024; // 4MB; Vercel caps request bodies at ~4.5MB
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_PHOTO_BYTES, files: 1 },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME.includes(file.mimetype)) {
      const err = new Error('Photo must be a JPG, PNG, or WEBP image');
      err.statusCode = 400;
      return cb(err);
    }
    cb(null, true);
  },
});

// The declared MIME type comes from the client, so also sniff the file
// signature before trusting the bytes.
function sniffImageType(buffer) {
  if (!buffer || buffer.length < 12) return null;
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return 'jpeg';
  if (
    buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47 &&
    buffer[4] === 0x0d && buffer[5] === 0x0a && buffer[6] === 0x1a && buffer[7] === 0x0a
  ) return 'png';
  if (
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) return 'webp';
  return null;
}

// Wraps multer so its errors (size limit, bad type) become clean 400 JSON
// responses instead of falling through to the generic 500 handler. Requests
// that are not multipart/form-data pass through untouched, so the JSON API
// keeps working.
function photoUpload(req, res, next) {
  upload.single('photo')(req, res, (err) => {
    if (err) {
      const message =
        err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE'
          ? 'Photo must be 4MB or smaller'
          : err.message || 'Photo upload failed';
      return res.status(err.statusCode || 400).json({ success: false, message });
    }
    if (req.file && !sniffImageType(req.file.buffer)) {
      return res.status(400).json({ success: false, message: 'File content is not a valid JPG, PNG, or WEBP image' });
    }
    next();
  });
}

module.exports = { photoUpload, sniffImageType, MAX_PHOTO_BYTES };
