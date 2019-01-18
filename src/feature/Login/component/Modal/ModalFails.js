import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import ReportIcon from '@material-ui/icons/Report';

const ModalFails = ({ open, handleResend, handleCloseModal }) => (
  <div className={open ? 'c-modal c-modal--visible' : 'c-modal'}>
    <div className="c-modal__content">
      <div className="c-modal__title">
        <div className="c-modal__align--center">
          <div className="c-modal__svg c-modal__svg--error"><ReportIcon /></div>
          <div className="c-modal__lead c-modal__lead--error">Account not Activate!</div>
        </div>
      </div>
      <div className="c-modal__middle">
        Please click
        <b>
          &quot;Resend&quot;
        </b>
        to get activation email.
      </div>
      <div className="c-modal__footer c-modal__footer--right">
        <Button className="c-button" variant="contained" color="primary" onClick={handleResend}> Resend </Button>
        <Button className="c-button" variant="contained" color="secondary" onClick={handleCloseModal}> Close </Button>
      </div>
    </div>
  </div>
);

ModalFails.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleResend: PropTypes.func.isRequired,
};

export default ModalFails;
