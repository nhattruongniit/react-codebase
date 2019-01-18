const isEmpty = value => value === undefined || value === null || value === '';
const join = rules => (value, data, params) => rules.map(rule => rule(value, data, params)).filter(error => !!error)[0];

export const email = (value) => {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
  return false;
};

export const required = (value) => {
  if (isEmpty(value)) {
    return 'This field is required';
  }
  return false;
};

export const min = min => (value) => {
  if (!isEmpty(value) && value.length < min) {
    return `Must be at least ${min} characters`;
  }
  return false;
};

export const max = max => (value) => {
  if (!isEmpty(value) && value.length > max) {
    return `Must be no more than ${max} characters`;
  }
  return false;
};

export const integer = (value) => {
  if (!isEmpty(value) && !Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
  return false;
};

export const oneOf = enumeration => (value) => {
  if (!enumeration.includes(value)) {
    return `Must be one of: ${enumeration.join(', ')}`;
  }
  return false;
};

export const noMatch = (field, msg) => (value, data) => {
  if (data) {
    if (value === data[field]) {
      return msg;
    }
  }
  return false;
};

export const match = (field, msg) => (value, data) => {
  if (data) {
    if (value !== data[field]) {
      return msg;
    }
  }
  return false;
};

export const passwordPattern = (value) => {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(value)) {
    return 'Invalid password pattern';
  }
  return false;
};

export const createValidator = (rules, params) => (data = {}) => {
  const errors = {};
  Object.keys(rules).forEach((key) => {
    const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
    const error = rule(data[key], data, { key, ...params });
    if (error) {
      errors[key] = error;
    }
  });
  return errors;
};

export const passwordFormat = (value) => {
  const reg = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$');
  if (!reg.test(value)) {
    return 'Invalid password';
  }
  return false;
};

export const phoneFormat = (value) => {
  const reg = new RegExp('([0-9\\s\\-]{7,})(?:\\s*(?:#|x\\.?|ext\\.?|extension)\\s*(\\d+))?$');
  if (!reg.test(value)) {
    return 'Invalid phone number format';
  }
  return false;
};
