import React from 'react';

export const Input = ({ className, id, name, type, labelText, ...rest }) => {
  return (
    <div className={`input-control-hotizontal ${className}`}>
      {labelText && (
        <label style={{ marginRight: 8 }} htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        className="input"
        id={id || name}
        name={name}
        type={type}
        {...rest}
      />
    </div>
  );
};
