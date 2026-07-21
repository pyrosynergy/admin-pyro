import React, { useEffect, useMemo, useState } from 'react';

// Mirrors the server rules (middleware/upload.js): jpg/png/webp, 4MB cap.
// Client-side checks are a convenience only — the server re-validates.
const MAX_BYTES = 4 * 1024 * 1024;
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];

const PhotoField = ({ file, onFileChange, currentUrl }) => {
  const [error, setError] = useState('');
  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = (e) => {
    const selected = e.target.files && e.target.files[0];
    if (!selected) {
      setError('');
      onFileChange(null);
      return;
    }
    if (!ACCEPTED.includes(selected.type)) {
      setError('Photo must be a JPG, PNG, or WEBP image');
      e.target.value = '';
      onFileChange(null);
      return;
    }
    if (selected.size > MAX_BYTES) {
      setError('Photo must be 4MB or smaller');
      e.target.value = '';
      onFileChange(null);
      return;
    }
    setError('');
    onFileChange(selected);
  };

  const shownUrl = previewUrl || currentUrl || '';

  return (
    <label className="admin-field">
      <span>Photo (optional — JPG/PNG/WEBP, max 4MB)</span>
      <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleChange} />
      {shownUrl && (
        <img
          className="admin-photo-preview"
          src={shownUrl}
          alt="Employee photo preview"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      )}
      {error && <p className="admin-error">{error}</p>}
    </label>
  );
};

export default PhotoField;
