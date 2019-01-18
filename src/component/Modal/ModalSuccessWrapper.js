import React from 'react';
import PropTypes from 'prop-types';
// import Button from '@material-ui/core/Button';

const ModalSuccessWrapper = ({ open, children, message }) => (
  <div className={open ? 'c-modal c-modal--visible' : 'c-modal'}>
    <div className="c-modal__content">
      <div className="c-modal__title">
        <div className="c-modal__align--center">
          <img src="/assets/images/img-icon-success.svg" title="Icon Letter" alt="Icon Letter" />
          <div className="c-modal__lead c-modal__lead--success"> Success !</div>
        </div>
      </div>
      <div className="c-modal__middle">{message}</div>
      {children && (
        <div className="c-modal__footer c-modal__footer--right">
          {children}
        </div>
      )}
    </div>
  </div>
);

ModalSuccessWrapper.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
  message: PropTypes.string.isRequired,
};

export default ModalSuccessWrapper;
