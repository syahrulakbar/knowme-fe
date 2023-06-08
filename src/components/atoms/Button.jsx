import PropTypes from "prop-types";

const Button = ({ children, ...rest }) => {
  const { label, icon, type = "button" } = rest;
  return (
    <button type={type} role="button" {...rest} aria-label={`button ${label ? label : ""}`}>
      {icon && icon}
      {label}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.any,
};

export default Button;
