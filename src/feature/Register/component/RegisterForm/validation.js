import memoize from 'lru-memoize';
import {
  createValidator,
  required,
  email,
  match,
} from 'lib/validation';

const loginValidation = createValidator({
  email: [required, email],
  password: [required],
  passwordConfirmation: [required, match('password', "Confirm password doesn't match")],
});
export default memoize(10)(loginValidation);
