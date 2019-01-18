import React from 'react';
import TextField from '@material-ui/core/TextField';
import { fieldPropTypes } from 'redux-form';
import './style.scss';

function handleEyePassword(id) {
  const field = document.getElementById(id);
  const fieldAttr = field.getAttribute('type');
  const icons = document.getElementsByClassName(id)[0];
  if (fieldAttr === 'password') {
    field.setAttribute('type', 'text');
    icons.innerHTML = 'visibility_off';
  } else {
    field.setAttribute('type', 'password');
    icons.innerHTML = 'visibility';
  }
}

const FormInput = ({
  id, input, label, classLabel, eyesPassword, meta: { touched, error }, ...custom
}) => {
  const errorText = touched && error;
  return (
    <div>
      <TextField
        id={id}
        error={Boolean(errorText)}
        label={errorText || label}
        placeholder={label}
        className="form-control-ma"
        {...input}
        {...custom}
      />
      {eyesPassword && (
        <button type="button" className="c-button__eyes" onClick={() => handleEyePassword(id)}>
          <i className={`${id} material-icons`}>visibility</i>
        </button>
      )}
    </div>
  );
};

FormInput.propTypes = fieldPropTypes;

export default (FormInput);
