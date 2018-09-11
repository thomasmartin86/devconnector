const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};

  //make sure that data properties are set to empty string if they aren't there
  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  //from date
  if (Validator.isEmpty(data.from)) {
    errors.from = 'From is required';
  }
  //from date
  if (Validator.isEmpty(data.school)) {
    errors.school = 'School is required';
  }
  //from date
  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree is required';
  }
  //from date
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
