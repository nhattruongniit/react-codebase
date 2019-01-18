import memoize from 'lru-memoize';
import {
  createValidator,
  required,
  match,
  noMatch,
} from 'lib/validation';

const loginValidation = createValidator({
  passwordOld: [required],
  password: [required, noMatch('passwordOld', "New password doesn't same as Old password")],
  passwordConfirmation: [required, match('password', "Confirm password doesn't match New password")],
});

export default memoize(10)(loginValidation);
