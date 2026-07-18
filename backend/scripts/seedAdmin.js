// Creates the admin user from ADMIN_USERNAME / ADMIN_PASSWORD env vars.
// Idempotent: if the username already exists, the password hash is synced
// to ADMIN_PASSWORD (so editing .env and re-running updates the login).
// Run with: npm run seed:admin
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function main() {
  const { MONGODB_URI, ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not set in .env');
    process.exit(1);
  }
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    console.error('ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env');
    process.exit(1);
  }
  if (ADMIN_PASSWORD.length < 10) {
    console.error('ADMIN_PASSWORD must be at least 10 characters');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);

  const username = ADMIN_USERNAME.trim().toLowerCase();
  const existing = await User.findOne({ username });
  if (existing) {
    const unchanged = await bcrypt.compare(ADMIN_PASSWORD, existing.passwordHash);
    if (unchanged) {
      console.log(`Admin user "${username}" already exists with this password — nothing to do.`);
    } else {
      existing.passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
      await existing.save();
      console.log(`Admin user "${username}" already exists — password updated from .env.`);
    }
  } else {
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await User.create({ username, passwordHash, role: 'admin' });
    console.log(`Admin user "${username}" created.`);
  }

  // Flag stale accounts left behind by a username change in .env.
  const others = await User.find({ username: { $ne: username } }, 'username').lean();
  if (others.length) {
    console.log(`Note: other user accounts exist: ${others.map((u) => `"${u.username}"`).join(', ')}`);
  }

  // Ensure unique indexes exist (users.username, employees.empId, employees.token).
  const Employee = require('../models/Employee');
  await User.syncIndexes();
  await Employee.syncIndexes();
  console.log('Indexes synced.');

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
