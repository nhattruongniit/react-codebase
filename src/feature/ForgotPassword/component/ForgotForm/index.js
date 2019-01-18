import React, { Component } from 'react';
import { reduxForm, Field, propTypes } from 'redux-form';
import { FormInput } from 'component';
import Button from '@material-ui/core/Button';
import validate from './validation';

class ForgotForm extends Component {
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
                name="email"
                type="text"
                component={FormInput}
                label="Email"
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
  form: 'forgot-password',
  validate,
})(ForgotForm);
