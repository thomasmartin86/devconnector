import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

//pass in all properties
const SelectListGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  options
}) => {
  //map through each option and create option tag with label used as key
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">
      <select
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-tet text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.array.isRequired
};

SelectListGroup.defaultProps = {
  type: 'text'
};

export default SelectListGroup;
