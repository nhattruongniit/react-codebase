import memoize from 'lru-memoize';
import {
  createValidator,
  required,
  match,
} from 'lib/validation';

const resetValidation = createValidator({
  password: [required],
  passwordConfirmation: [required, match('password', "Confirm password does'nt match")],
});
export default memoize(10)(resetValidation);
