import React from 'react';
import { VALIDITY_OPTIONS } from './api.js';

// Colour-coded three-state picker for the Validity field:
// active (green), inactive (red), under process (yellow).
const ValidityPicker = ({ value, onChange }) => (
  <div className="admin-field">
    <span>Validity</span>
    <div className="admin-validity-group" role="radiogroup" aria-label="Validity">
      {VALIDITY_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          className={`admin-validity-option ${option.value} ${value === option.value ? 'selected' : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
);

export default ValidityPicker;
