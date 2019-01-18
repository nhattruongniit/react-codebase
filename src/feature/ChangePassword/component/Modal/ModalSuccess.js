import React from 'react';
import PropTypes from 'prop-types';

import { ModalSuccessWrapper } from 'component';

import Button from '@material-ui/core/Button';

const ModalSuccess = ({ open, onCloseModal }) => (
  <ModalSuccessWrapper open={open} message="You changed password successfully! Please login again.">
    <Button variant="contained" color="secondary" onClick={onCloseModal}> Close </Button>
  </ModalSuccessWrapper>
);

ModalSuccess.propTypes = {
  open: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default ModalSuccess;
