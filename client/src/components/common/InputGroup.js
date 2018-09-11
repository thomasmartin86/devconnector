import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

//pass in all properties
const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange
}) => {
  console.log(icon);
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.string
};

//default props
InputGroup.defaultProps = {
  type: 'text'
};

export default InputGroup;
