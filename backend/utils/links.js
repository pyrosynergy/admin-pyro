// Verification link builders. Two forms point at the same employee:
//
//   long  : /verify/<48-hex token>  — unguessable, revocable
//   short : /verify/e<empId>        — QR-friendly, empId with leading zeros
//                                      stripped (00004 -> e4, 00016 -> e16)
//
// The short form is what QR codes on ID cards encode; routes/verify.js
// resolves it back to the zero-padded empId.

function verifyBaseUrl() {
  return (process.env.VERIFY_BASE_URL || 'https://pyrosynergy.com').replace(/\/$/, '');
}

function buildVerifyLink(token) {
  return `${verifyBaseUrl()}/verify/${token}`;
}

// "00004" -> "e4". Returns null for legacy non-numeric IDs, which have no
// short form.
function shortEmpCode(empId) {
  const digits = typeof empId === 'string' ? empId.trim() : '';
  if (!/^\d{1,5}$/.test(digits)) return null;
  return `e${Number(digits)}`;
}

function buildShortVerifyLink(empId) {
  const code = shortEmpCode(empId);
  return code ? `${verifyBaseUrl()}/verify/${code}` : null;
}

module.exports = { verifyBaseUrl, buildVerifyLink, shortEmpCode, buildShortVerifyLink };
