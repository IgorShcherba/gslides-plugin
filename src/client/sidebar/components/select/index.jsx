import React from 'react';

export const Select = ({ options, onChange, value, ...rest }) => {
  return (
    <select
      className="select"
      {...rest}
      onChange={e => onChange(e.target.value)}
      value={value}
    >
      {options.map(({ title, value }) => (
        <option key={value}>{title}</option>
      ))}
    </select>
  );
};
