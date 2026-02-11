import React from 'react';

const InputForm = React.forwardRef(({ className, title, type, id, placeholder, errors, required, ...props }, ref) => {
  return (
    <>
      <span>{title}</span>
      <label htmlFor={id}>
        <input
          className={className}
          id={id}
          type={type}
          ref={ref}
          placeholder={placeholder}
          {...props}
        />
        {errors?.[props.name] && <span className="error-message">{errors[props.name].message}</span>}
      </label>
    </>
  );
});

export default InputForm;