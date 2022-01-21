import React from 'react';
import classnames from 'classnames';

export const Input = ({
  className,
  id,
  name,
  type,
  labelText,
  hotizontal,
  fullWidth,
  outlined,
  ...rest
}) => {
  return (
    <div
      className={classnames(
        {
          'form-control': !hotizontal,
          'form-control-horizontal': labelText && hotizontal,
        },
        className
      )}
    >
      {labelText && (
        <label style={{ marginRight: 8 }} htmlFor={id || name}>
          {labelText}
        </label>
      )}
      <input
        className={classnames('input', { outlined, fullWidth })}
        id={id || name}
        name={name}
        type={type}
        {...rest}
      />
    </div>
  );
};
