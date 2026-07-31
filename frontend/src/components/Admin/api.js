const API_BASE = import.meta.env.PROD
  ? 'https://admin-pyro-backend.vercel.app'
  : 'http://localhost:5000';

// All admin requests carry the session cookie plus the X-Requested-With
// header the backend's CSRF guard requires on state-changing methods.
// Plain objects are sent as JSON; FormData is sent as multipart (the
// browser sets its own Content-Type with the boundary).
export async function apiFetch(path, { method = 'GET', body } = {}) {
  const isFormData = body instanceof FormData;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: 'include',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      ...(body && !isFormData ? { 'Content-Type': 'application/json' } : {}),
    },
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // non-JSON response body
  }

  if (!res.ok) {
    const error = new Error((data && data.message) || `Request failed (${res.status})`);
    error.status = res.status;
    throw error;
  }
  return data;
}

// Verification states for the "Validity" field, with their display labels.
export const VALIDITY_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'under-process', label: 'Under process' },
];

export function validityLabel(value) {
  const option = VALIDITY_OPTIONS.find((o) => o.value === value);
  return option ? option.label : value;
}

export function toInputDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
}

export function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
