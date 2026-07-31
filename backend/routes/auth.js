const express = require('express');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const User = require('../models/User');
const {
  SESSION_COOKIE,
  signSession,
  sessionCookieOptions,
  requireAuth,
  csrfGuard,
} = require('../middleware/auth');

// Compared against when the username doesn't exist, so both branches cost
// one bcrypt comparison (prevents username enumeration via response timing).
const DUMMY_HASH = bcrypt.hashSync('invalid-password-placeholder', 12);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts, try again later' },
});

// @route   POST /api/auth/login
// @access  Public (rate-limited)
router.post('/login', loginLimiter, csrfGuard, async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (
      typeof username !== 'string' || typeof password !== 'string' ||
      !username.trim() || !password || password.length > 256
    ) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    const user = await User.findOne({ username: username.trim().toLowerCase() });
    const hash = user ? user.passwordHash : DUMMY_HASH;
    const passwordOk = await bcrypt.compare(password, hash);

    if (!user || !passwordOk) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    res.cookie(SESSION_COOKIE, signSession(user), sessionCookieOptions());
    return res.json({
      success: true,
      user: { username: user.username, role: user.role },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/auth/logout
// @access  Authenticated
router.post('/logout', csrfGuard, requireAuth, (req, res) => {
  res.clearCookie(SESSION_COOKIE, { path: '/' });
  return res.json({ success: true });
});

// @route   GET /api/auth/me
// @access  Authenticated
router.get('/me', requireAuth, (req, res) => {
  return res.json({
    success: true,
    user: { username: req.user.username, role: req.user.role },
  });
});

module.exports = router;
