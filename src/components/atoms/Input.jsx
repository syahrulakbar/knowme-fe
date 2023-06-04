import PropTypes from "prop-types";

const Input = ({ children, ...rest }) => {
  const { name, label, icon } = rest;
  return (
    <>
      {label && (
        <label className="w-full" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="relative h-10 w-full ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">{icon}</div>
        <input {...rest} />
        {children}
      </div>
    </>
  );
};
Input.propTypes = {
  children: PropTypes.any,
};

export default Input;
