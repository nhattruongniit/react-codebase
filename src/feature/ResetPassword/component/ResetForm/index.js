import React, { Component } from 'react';
import { reduxForm, Field, propTypes } from 'redux-form';
import { FormInput } from 'component';
import Button from '@material-ui/core/Button';
import validate from './validation';

class ResetForm extends Component {
    static propTypes = {
      ...propTypes,
    };

    render() {
      const {
        handleSubmit,
      } = this.props;

      return (
        <div>
          <form className="c-activities__form" onSubmit={handleSubmit}>
            <div className="c-form__row">
              <Field
                id="password"
                name="password"
                type="password"
                component={FormInput}
                label="Password"
                eyesPassword
              />
            </div>
            <div className="c-form__row">
              <Field
                id="confirm_password"
                name="passwordConfirmation"
                type="password"
                component={FormInput}
                label="Confirm Password"
                eyesPassword
              />
            </div>
            <div className="c-activities__button text-center">
              <Button type="submit" variant="outlined" color="primary">
                SUBMIT
              </Button>
            </div>
          </form>
        </div>
      );
    }
}

export default reduxForm({
  form: 'reset',
  validate,
})(ResetForm);
