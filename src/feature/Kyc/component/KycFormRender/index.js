import React from 'react';
import { reduxForm, Field, propTypes } from 'redux-form';
import PropTypes from 'prop-types';
import { FormInput } from 'component';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { required, email, min, max } from 'lib/validation';

const FORM_FACTORY = {
  TextField: FormInput,
};

const VALIDATE_FACTORY = {
  required,
  email,
  min,
  max,
};

const generateValidate = validate =>
  validate.map(({ func, arg }) => {
    if (!VALIDATE_FACTORY[func]) {
      throw Error(`Miss ${func}`);
    }
    if (arg) {
      return VALIDATE_FACTORY[func](arg);
    }
    return VALIDATE_FACTORY[func];
  });

const KycFormRender = ({ config, handleSubmit }) => (
  <div className="login-form">
    <form className="form-inline clearfix" onSubmit={handleSubmit}>
      {config &&
        config.map(input => {
          const { inputType, id, validate, typeOf, ...props } = input;

          return <Field key={id} {...props} validate={generateValidate(validate)} component={FORM_FACTORY[inputType]} />;
        })}
      <div className="form-control-ma">
        <Button type="submit" variant="outlined" color="primary">
          <FontAwesomeIcon icon="bolt" />
          SUBMIT
        </Button>
      </div>
      <div className="form-control-ma">
        <Button variant="outlined" color="primary">
          <FontAwesomeIcon icon="angle-double-right" />
          NEXT LEVEL
        </Button>
      </div>
    </form>
  </div>
);

KycFormRender.propTypes = {
  config: PropTypes.array.isRequired,
  ...propTypes,
};

export default reduxForm({
  form: 'login',
})(KycFormRender);
