import React, { Component } from 'react';
import { reduxForm, Field, propTypes } from 'redux-form';
import { FormInput } from 'component';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import validate from './validation';

class LoginForm extends Component {
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
                placeholder="Email address"
                type="text"
                component={FormInput}
                label="Email"
              />
            </div>
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
            <div className="c-activities__button text-center">
              <Button type="submit" variant="outlined" color="primary">
                <FontAwesomeIcon icon="unlock" />
                LOGIN
              </Button>
            </div>
          </form>
        </div>
      );
    }
}

export default reduxForm({
  form: 'login',
  validate,
})(LoginForm);
