import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Loading, loadingAction } from 'feature';
import Helper from 'lib/helper';
import { forgotPassword } from './api';
import ForgotForm from './component/ForgotForm';
import { ModalSuccess } from './component/Modal';

class Login extends Component {
  static propTypes = {
    history: PropTypes.any.isRequired,
    match: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      mgsError: '',
      open: false,
    };
    const { match: { params: { nameApp } } } = this.props;
    this.hookNameApp = nameApp;
  }

  componentWillMount() {
    const { history } = this.props;
    Helper.setStorage('nameApp', this.hookNameApp);
    const cookie = Helper.getCookie();
    if (cookie) history.push('profile');
  }

  handleCloseModal = () => {
    this.setState({ open: false });
  }

  handleResend = () => {
    console.log('send email again.');
  }

  handleSubmit = async (payload) => {
    // this.setState({ open: true });
    try {
      const { loadingAction } = this.props;
      await loadingAction(() => forgotPassword(this.hookNameApp, payload));
    } catch (error) {
      this.setState({ mgsError: error.message });
    }
  }

  handleBackLogin = () => {
    const { history } = this.props;
    history.push('login');
  }

  render() {
    const { mgsError, open } = this.state;
    return (
      <div>
        <div className="c-activities">
          <div className="c-activities__container">
            <h2 className="c-activities__heading">FORGOT PASSWORD</h2>
            <div className="c-text c-text--error">{mgsError}</div>
            <ForgotForm
              onSubmit={this.handleSubmit}
            />
            <div className="c-activities__options c-activities__options--center">
              <Link to="login">Login?</Link>
            </div>
          </div>
        </div>
        <Loading />
        <ModalSuccess
          open={open}
          handleBackLogin={this.handleBackLogin}
          handleResend={this.handleResend}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    loadingAction,
  }, dispatch)
);

export default withRouter(connect(null, mapDispatchToProps)(Login));
