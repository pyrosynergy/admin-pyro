const jwt = require('jsonwebtoken');
const { ALLOWED_ORIGINS } = require('../config/origins');

const SESSION_COOKIE = 'admin_session';
const SESSION_TTL_HOURS = 8;

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return secret;
}

function signSession(user) {
  return jwt.sign(
    { sub: user._id.toString(), username: user.username, role: user.role },
    getJwtSecret(),
    { expiresIn: `${SESSION_TTL_HOURS}h` }
  );
}

function sessionCookieOptions() {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    // The admin UI and this API are on different domains in production,
    // so the cookie must be SameSite=None there. CSRF is covered by
    // csrfGuard below. Locally (http) 'lax' keeps the cookie working.
    sameSite: isProd ? 'none' : 'lax',
    maxAge: SESSION_TTL_HOURS * 60 * 60 * 1000,
    path: '/',
  };
}

// Verifies the session cookie and attaches req.user = { sub, username, role }.
function requireAuth(req, res, next) {
  const token = req.cookies && req.cookies[SESSION_COOKIE];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }
  try {
    req.user = jwt.verify(token, getJwtSecret());
    return next();
  } catch (err) {
    res.clearCookie(SESSION_COOKIE, { path: '/' });
    return res.status(401).json({ success: false, message: 'Session expired or invalid' });
  }
}

// Role gate; compose after requireAuth. Accepts multiple roles so future
// roles (e.g. requireRole('admin', 'editor')) work without changes here.
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    return next();
  };
}

// CSRF protection for cookie-based sessions on state-changing requests:
// the request must carry X-Requested-With (browsers won't add it cross-site
// without a CORS preflight) and, when an Origin header is present, it must
// be on the allowlist.
function csrfGuard(req, res, next) {
  const unsafe = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method);
  if (!unsafe) return next();

  if (req.headers['x-requested-with'] !== 'XMLHttpRequest') {
    return res.status(403).json({ success: false, message: 'Missing CSRF header' });
  }
  const origin = req.headers.origin;
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ success: false, message: 'Origin not allowed' });
  }
  return next();
}

module.exports = {
  SESSION_COOKIE,
  signSession,
  sessionCookieOptions,
  requireAuth,
  requireRole,
  csrfGuard,
};
