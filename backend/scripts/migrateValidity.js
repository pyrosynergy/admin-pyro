// One-time migration: validity changed from a "valid until" Date (paired with
// a separate active/inactive status field) to a single verification state
// string: 'active' | 'inactive' | 'under-process'.
//
// Old records become 'active' when status was active and the date had not
// passed, otherwise 'inactive'. The legacy status field is removed.
//
// Run with: npm run migrate:validity
// (on machines with the Atlas DNS issue: node -r ./scripts/localdns.js scripts/migrateValidity.js)
require('dotenv').config();
const mongoose = require('mongoose');

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not set in .env');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  // Raw collection access: the current schema no longer matches old documents.
  const employees = mongoose.connection.collection('employees');

  const legacy = await employees.find({ validity: { $type: 'date' } }).toArray();
  if (!legacy.length) {
    console.log('No employees need migration (no date-typed validity found).');
  }

  let migrated = 0;
  for (const doc of legacy) {
    const stillValid = doc.status === 'active' && doc.validity.getTime() >= Date.now();
    const validity = stillValid ? 'active' : 'inactive';
    await employees.updateOne(
      { _id: doc._id },
      { $set: { validity }, $unset: { status: '' } }
    );
    migrated += 1;
    console.log(`OK   ${doc.empId} (${doc.fullName}): ${validity}`);
  }

  console.log(`Done: ${migrated}/${legacy.length} migrated.`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
