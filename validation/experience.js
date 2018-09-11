const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  //make sure that data properties are set to empty string is they aren't there
  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  //make sure title isn't empty
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is required';
  }

  //make sure title isn't empty
  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company is required';
  }

  //from date
  if (Validator.isEmpty(data.from)) {
    errors.from = 'From is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
