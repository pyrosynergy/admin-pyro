import React, { useState, useEffect, useCallback } from 'react';
import { apiFetch, toInputDate, formatDate, validityLabel, VALIDITY_OPTIONS } from './api.js';
import PhotoField from './PhotoField.jsx';
import ValidityPicker from './ValidityPicker.jsx';

const EMPTY_EDIT = {
  empId: '',
  fullName: '',
  designation: '',
  issuedOn: '',
  validity: 'active',
};

const EmployeesTab = ({ onSessionExpired }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // employee being edited
  const [editForm, setEditForm] = useState(EMPTY_EDIT);
  const [editPhoto, setEditPhoto] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [regeneratingId, setRegeneratingId] = useState(null);

  const handleApiError = useCallback(
    (err, setter) => {
      if (err.status === 401) {
        onSessionExpired();
        return;
      }
      setter(err.message || 'Something went wrong');
    },
    [onSessionExpired]
  );

  const loadEmployees = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiFetch('/api/admin/employees');
      setEmployees(data.employees);
    } catch (err) {
      handleApiError(err, setError);
    } finally {
      setLoading(false);
    }
  }, [handleApiError]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const openEdit = (employee) => {
    setEditing(employee);
    setEditError('');
    setEditPhoto(null);
    setEditForm({
      empId: employee.empId,
      fullName: employee.fullName,
      designation: employee.designation,
      issuedOn: toInputDate(employee.issuedOn),
      // Fall back for legacy records where validity was still a date.
      validity: VALIDITY_OPTIONS.some((o) => o.value === employee.validity)
        ? employee.validity
        : 'active',
    });
  };

  const handleEditChange = (field) => (e) => {
    setEditForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setEditError('');
    try {
      const body = new FormData();
      Object.entries(editForm).forEach(([field, value]) => body.append(field, value));
      if (editPhoto) body.append('photo', editPhoto);

      const data = await apiFetch(`/api/admin/employees/${editing._id}`, {
        method: 'PUT',
        body,
      });
      setEmployees((prev) => prev.map((emp) => (emp._id === data.employee._id ? data.employee : emp)));
      setEditing(null);
    } catch (err) {
      handleApiError(err, setEditError);
    } finally {
      setSaving(false);
    }
  };

  const regenerateToken = async (employee) => {
    const confirmed = window.confirm(
      `Regenerate the verification token for ${employee.fullName}? The current verify link will stop working.`
    );
    if (!confirmed) return;
    setRegeneratingId(employee._id);
    setError('');
    try {
      const data = await apiFetch(`/api/admin/employees/${employee._id}/regenerate-token`, {
        method: 'POST',
      });
      setEmployees((prev) => prev.map((emp) => (emp._id === data.employee._id ? data.employee : emp)));
    } catch (err) {
      handleApiError(err, setError);
    } finally {
      setRegeneratingId(null);
    }
  };

  const copyLink = async (employee) => {
    try {
      await navigator.clipboard.writeText(employee.verifyLink);
      setCopiedId(employee._id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      window.prompt('Copy the verify link:', employee.verifyLink);
    }
  };

  if (loading) {
    return <p className="admin-muted">Loading employees…</p>;
  }

  return (
    <div className="admin-card">
      {error && <p className="admin-error">{error}</p>}

      {employees.length === 0 ? (
        <p className="admin-muted">No employees yet. Add the first one from the “Add employee” tab.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Emp ID</th>
                <th>Full name</th>
                <th>Designation</th>
                <th>Issued on</th>
                <th>Validity</th>
                <th>Verify link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>
                    {employee.photoUrl ? (
                      <img
                        className="admin-photo-thumb"
                        src={employee.photoUrl}
                        alt={employee.fullName}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="admin-muted">—</span>
                    )}
                  </td>
                  <td className="admin-mono">{employee.empId}</td>
                  <td>{employee.fullName}</td>
                  <td>{employee.designation}</td>
                  <td>{formatDate(employee.issuedOn)}</td>
                  <td>
                    <span className={`admin-badge ${employee.validity}`}>{validityLabel(employee.validity)}</span>
                  </td>
                  <td>
                    <button className="admin-btn admin-btn-small" onClick={() => copyLink(employee)}>
                      {copiedId === employee._id ? 'Copied!' : 'Copy link'}
                    </button>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-btn admin-btn-small" onClick={() => openEdit(employee)}>
                        Edit
                      </button>
                      <button
                        className="admin-btn admin-btn-small admin-btn-ghost"
                        disabled={regeneratingId === employee._id}
                        onClick={() => regenerateToken(employee)}
                      >
                        {regeneratingId === employee._id ? 'Working…' : 'Regenerate token'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="admin-modal-overlay">
          {/* Deliberately no click-outside close: the modal only closes via
              Cancel / Save changes, so a stray click (e.g. releasing a text
              selection outside the card) can't discard edits. */}
          <div className="admin-modal">
            <h2 className="admin-subtitle">
              Edit {editing.fullName} <span className="admin-mono">({editing.empId})</span>
            </h2>
            <form onSubmit={saveEdit} className="admin-form">
              <label className="admin-field">
                <span>Employee ID</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={editForm.empId}
                  onChange={handleEditChange('empId')}
                  required
                  maxLength={5}
                  pattern="\d{1,5}"
                  title="Up to 5 digits — shorter IDs are zero-padded (e.g. 42 becomes 00042)"
                />
              </label>
              <label className="admin-field">
                <span>Full name</span>
                <input type="text" value={editForm.fullName} onChange={handleEditChange('fullName')} required maxLength={120} />
              </label>
              <label className="admin-field">
                <span>Designation</span>
                <input type="text" value={editForm.designation} onChange={handleEditChange('designation')} required maxLength={120} />
              </label>
              <PhotoField file={editPhoto} onFileChange={setEditPhoto} currentUrl={editing.photoUrl || ''} />
              <div className="admin-field-row">
                <label className="admin-field">
                  <span>Issued on</span>
                  <input type="date" value={editForm.issuedOn} onChange={handleEditChange('issuedOn')} required />
                </label>
                <ValidityPicker
                  value={editForm.validity}
                  onChange={(validity) => setEditForm((prev) => ({ ...prev, validity }))}
                />
              </div>
              {editError && <p className="admin-error">{editError}</p>}
              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="admin-btn admin-btn-ghost"
                  onClick={() => setEditing(null)}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? 'Saving…' : 'Save changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesTab;
