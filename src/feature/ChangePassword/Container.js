import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Helper from 'lib/helper';
import { loadingAction } from 'feature/Loading';
import { changePassword } from './api';
import { ModalSuccess } from './component/Modal';
import ChangePasswordForm from './component/Form';

class ChangePassword extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      messageError: '',
      open: false,
    };
  }

  handleSubmit = async (payload) => {
    try {
      const { loadingAction } = this.props;
      await loadingAction(() => changePassword(payload));
      this.setState({ open: true });
    } catch (error) {
      this.setState({ messageError: error.message });
    }
  }

  onCloseModal = () => {
    const { history } = this.props;
    Helper.removeCookie();
    history.push('login');
  }

  render() {
    const { messageError, open } = this.state;
    return (
      <div className="o-container o-container--middle">
        <div className="c-text c-text--error">{messageError}</div>
        <ChangePasswordForm
          onSubmit={this.handleSubmit}
        />
        <ModalSuccess open={open} onCloseModal={this.onCloseModal} />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    loadingAction,
  }, dispatch)
);

export default withRouter(connect(null, mapDispatchToProps)(ChangePassword));
