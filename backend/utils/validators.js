// Small input validators for the admin endpoints. Each returns an error
// message string, or null when the value is valid.

// Employee IDs are exactly 5 digits; shorter numeric input is accepted and
// left-padded with zeros (e.g. "42" -> "00042") via normalizeEmpId.
const EMP_ID_PATTERN = /^\d{1,5}$/;

function validateEmpId(value) {
  if (typeof value !== 'string' || !EMP_ID_PATTERN.test(value.trim())) {
    return 'Employee ID must be 1-5 digits';
  }
  return null;
}

function normalizeEmpId(value) {
  return value.trim().padStart(5, '0');
}

function validateText(value, label, max = 120) {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) {
    return `${label} is required (max ${max} characters)`;
  }
  return null;
}

function validateOptionalUrl(value, label) {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string' || value.length > 2048) {
    return `${label} is too long`;
  }
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return `${label} must be an http(s) URL`;
    }
  } catch {
    return `${label} must be a valid URL`;
  }
  return null;
}

function validateDate(value, label) {
  if (typeof value !== 'string' && !(value instanceof Date)) {
    return `${label} must be a date`;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return `${label} must be a valid date`;
  }
  return null;
}

const VALIDITY_STATES = ['active', 'inactive', 'under-process'];

function validateValidity(value) {
  if (!VALIDITY_STATES.includes(value)) {
    return 'Validity must be "active", "inactive" or "under-process"';
  }
  return null;
}

module.exports = {
  validateEmpId,
  normalizeEmpId,
  validateText,
  validateOptionalUrl,
  validateDate,
  validateValidity,
};
