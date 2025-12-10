import styles from './style.module.css';

const Button = ({
  variant = "primary",
  disabled = false,
  className = "",
  type = "button",
  children,
  ...props
}) => {
  const buttonClasses = [
    styles.btn,
    styles[`btn--${variant}`],
    disabled && styles['btn--disabled'],
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;