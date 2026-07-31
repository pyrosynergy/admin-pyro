// Single source of truth for browser origins allowed to call this API
// with credentials. Used by CORS and by the CSRF origin check.
const ALLOWED_ORIGINS = [
  'https://pyrosynergy.com',
  'https://www.pyrosynergy.com',
  'https://land-pyro.vercel.app',
  'https://land-pyro-git-structure1-prachetyerrs-projects.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
  'https://admin-pyro-backend.vercel.app',
];

module.exports = { ALLOWED_ORIGINS };
