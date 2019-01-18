import memoize from 'lru-memoize';
import {
  createValidator,
  required,
  email,
} from 'lib/validation';

const loginValidation = createValidator({
  email: [required, email],
  password: [required],
});
export default memoize(10)(loginValidation);
