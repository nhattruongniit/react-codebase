import React from 'react';
import PropTypes from 'prop-types';

import { ModalSuccessWrapper } from 'component';

import Button from '@material-ui/core/Button';

const ModalSuccess = ({ open, handleBackLogin }) => (
  <ModalSuccessWrapper open={open} message="Your password has been reset successfully!">
    <Button className="c-button" variant="contained" color="primary" onClick={handleBackLogin}> Back to Login </Button>
  </ModalSuccessWrapper>
);

ModalSuccess.propTypes = {
  open: PropTypes.bool.isRequired,
  handleBackLogin: PropTypes.func.isRequired,
};

export default ModalSuccess;
