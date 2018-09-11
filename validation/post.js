const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  //make sure that data properties are set to empty string is they aren't there
  data.text = !isEmpty(data.text) ? data.text : '';

  //email
  //make sure valid emaili
  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Post must be between 10 and 300 characters';
  }

  //make sure enail isn't empty
  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
