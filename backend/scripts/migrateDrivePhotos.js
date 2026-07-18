// One-time migration: employees whose photoLink is a Google Drive share link
// (and who have no photoUrl yet) get their photo downloaded from Drive and
// re-uploaded to Cloudinary, storing the result in photoUrl.
//
// The Drive files must be shared as "anyone with the link can view".
// Run with: npm run migrate:photos
// (on machines with the Atlas DNS issue: node -r ./scripts/localdns.js scripts/migrateDrivePhotos.js)
require('dotenv').config();
const mongoose = require('mongoose');
const Employee = require('../models/Employee');
const { uploadEmployeePhoto, isStorageConfigured } = require('../config/cloudinary');
const { sniffImageType, MAX_PHOTO_BYTES } = require('../middleware/upload');

// Extracts the file id from the common Drive URL shapes:
// .../file/d/<id>/view, .../open?id=<id>, .../uc?id=<id>
function driveFileId(link) {
  const byPath = link.match(/\/file\/d\/([\w-]{10,})/);
  if (byPath) return byPath[1];
  const byQuery = link.match(/[?&]id=([\w-]{10,})/);
  if (byQuery) return byQuery[1];
  return null;
}

async function downloadDriveImage(fileId) {
  const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Drive responded ${res.status} — is the file shared publicly?`);
  const buffer = Buffer.from(await res.arrayBuffer());
  if (buffer.length > MAX_PHOTO_BYTES) {
    throw new Error(`file is ${(buffer.length / 1024 / 1024).toFixed(1)}MB (cap is 4MB)`);
  }
  if (!sniffImageType(buffer)) {
    // Drive returns an HTML page instead of bytes for private files or
    // files large enough to trigger the virus-scan interstitial.
    throw new Error('Drive did not return an image (file is likely private)');
  }
  return buffer;
}

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not set in .env');
    process.exit(1);
  }
  if (!isStorageConfigured()) {
    console.error('CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET must be set in .env');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const candidates = await Employee.find({
    photoLink: /drive\.google\.com/,
    $or: [{ photoUrl: '' }, { photoUrl: { $exists: false } }],
  });

  if (!candidates.length) {
    console.log('No employees need migration (Drive photoLink present, photoUrl empty).');
  }

  let migrated = 0;
  for (const employee of candidates) {
    const label = `${employee.empId} (${employee.fullName})`;
    const fileId = driveFileId(employee.photoLink);
    if (!fileId) {
      console.error(`SKIP ${label}: could not extract a file id from "${employee.photoLink}"`);
      continue;
    }
    try {
      const buffer = await downloadDriveImage(fileId);
      employee.photoUrl = await uploadEmployeePhoto(buffer);
      await employee.save();
      migrated += 1;
      console.log(`OK   ${label}: ${employee.photoUrl}`);
    } catch (err) {
      console.error(`FAIL ${label}: ${err.message} — re-upload manually via the admin edit form.`);
    }
  }

  console.log(`Done: ${migrated}/${candidates.length} migrated.`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
