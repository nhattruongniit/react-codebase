/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { reduxForm, Field, propTypes } from 'redux-form';
import { FormInput } from 'component';
import Button from '@material-ui/core/Button';

import validate from './validation';

class ChangePasswordForm extends Component {
    static propTypes = {
      ...propTypes,
    };

    render() {
      const {
        handleSubmit,
      } = this.props;

      return (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="c-form__row">
              <Field
                id="old_password"
                name="passwordOld"
                type="password"
                component={FormInput}
                label="Old Password"
                eyesPassword
              />
            </div>
            <div className="c-form__row">
              <Field
                id="new_password"
                name="password"
                type="password"
                component={FormInput}
                label="New Password"
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
            <div className="c-button">
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </form>
        </div>
      );
    }
}

export default reduxForm({
  form: 'changepassword',
  validate,
})(ChangePasswordForm);
