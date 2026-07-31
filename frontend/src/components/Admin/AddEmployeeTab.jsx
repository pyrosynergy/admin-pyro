import React, { useState } from 'react';
import { apiFetch, toInputDate } from './api.js';
import PhotoField from './PhotoField.jsx';
import ValidityPicker from './ValidityPicker.jsx';

const today = () => toInputDate(new Date());

const INITIAL_FORM = {
  empId: '',
  fullName: '',
  designation: '',
  issuedOn: today(),
  validity: 'active',
};

const AddEmployeeTab = ({ onSessionExpired }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [photo, setPhoto] = useState(null);
  // Bumped after a successful add to remount the uncontrolled file input.
  const [formKey, setFormKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [created, setCreated] = useState(null);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setCreated(null);
    try {
      const body = new FormData();
      body.append('empId', form.empId.trim());
      body.append('fullName', form.fullName.trim());
      body.append('designation', form.designation.trim());
      body.append('issuedOn', form.issuedOn);
      body.append('validity', form.validity);
      if (photo) body.append('photo', photo);

      const data = await apiFetch('/api/admin/employees', { method: 'POST', body });
      setCreated(data.employee);
      setForm({ ...INITIAL_FORM, issuedOn: today() });
      setPhoto(null);
      setFormKey((k) => k + 1);
    } catch (err) {
      if (err.status === 401) {
        onSessionExpired();
        return;
      }
      setError(err.message || 'Failed to add employee');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-card">
      {created && (
        <div className="admin-success">
          <p>
            <strong>{created.fullName}</strong> ({created.empId}) added.
          </p>
          <p className="admin-mono admin-linktext">{created.verifyLink}</p>
          <button
            className="admin-btn admin-btn-small"
            onClick={() => navigator.clipboard.writeText(created.verifyLink).catch(() => {})}
          >
            Copy verify link
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-field-row">
          <label className="admin-field">
            <span>Employee ID</span>
            <input
              type="text"
              inputMode="numeric"
              value={form.empId}
              onChange={handleChange('empId')}
              required
              maxLength={5}
              pattern="\d{1,5}"
              title="Up to 5 digits — shorter IDs are zero-padded (e.g. 42 becomes 00042)"
              placeholder="e.g. 00042"
            />
          </label>
          <label className="admin-field">
            <span>Full name</span>
            <input type="text" value={form.fullName} onChange={handleChange('fullName')} required maxLength={120} />
          </label>
        </div>
        <div className="admin-field-row">
          <label className="admin-field">
            <span>Designation</span>
            <input type="text" value={form.designation} onChange={handleChange('designation')} required maxLength={120} />
          </label>
          <PhotoField key={formKey} file={photo} onFileChange={setPhoto} />
        </div>
        <div className="admin-field-row">
          <label className="admin-field">
            <span>Issued on</span>
            <input type="date" value={form.issuedOn} onChange={handleChange('issuedOn')} required />
          </label>
          <ValidityPicker
            value={form.validity}
            onChange={(validity) => setForm((prev) => ({ ...prev, validity }))}
          />
        </div>

        <p className="admin-muted">
          The verification token and link are generated automatically when you add the employee.
        </p>

        {error && <p className="admin-error">{error}</p>}

        <button type="submit" className="admin-btn admin-btn-primary" disabled={submitting}>
          {submitting ? 'Adding…' : 'Add employee'}
        </button>
      </form>
    </div>
  );
};

export default AddEmployeeTab;
