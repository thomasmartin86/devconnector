const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  //make sure that data properties are set to empty string is they aren't there
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  //email
  //make sure valid emaili
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  //make sure enail isn't empty
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  //passwords
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
