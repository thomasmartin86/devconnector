const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  //make sure that data properties are set to empty string is they aren't there
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  //name
  //validate name length between 2 and 30
  if (
    !Validator.isLength(data.name, {
      min: 2,
      max: 30
    })
  ) {
    errors.name = 'Name must be between 2 and 30 characters in length';
  }
  //make sure name isn't empty
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  //email
  //make sure enail isn't empty
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  //passwords
  //make sure password is between 6 and 30 characters
  if (
    !Validator.isLength(data.password, {
      min: 6,
      max: 30
    })
  ) {
    errors.password = 'Password must be at least 6 characters';
  }
  //make sure password2 isn't empty
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required';
  }
  //make sure  passwords match
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return { errors, isValid: isEmpty(errors) };
};
