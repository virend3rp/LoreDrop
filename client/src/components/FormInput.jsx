// src/components/FormInput.jsx
import React from 'react';

const FormInput = ({ label, id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold mb-2">
        {label}
      </label>
      <input 
        id={id}
        className="w-full p-3 bg-white border border-black/20 focus:border-[var(--color-antique-gold)] focus:outline-none transition"
        {...props} 
      />
    </div>
  );
};

export default FormInput;