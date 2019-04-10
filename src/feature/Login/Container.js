import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Loading, loadingAction } from 'feature';
import Helper from 'lib/helper';
import LoginForm from './component/LoginForm';
import { ModalFails } from './component/Modal';
import { login } from './api';
import { storeAuthLogin } from './redux/action';

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

  handleSubmit = async () => {
    const { history } = this.props;
    history.push(`/${this.hookNameApp}`);
    // try {
    //   // storeAuthLogin: save data into redux: // storeAuthLogin(data);
    //   // eslint-disable-next-line no-unused-vars
    //   const { loadingAction, storeAuthLogin, history } = this.props;
    //   await loadingAction(() => login(this.hookNameApp, payload));
    //   const cookie = Helper.getCookie();
    //   if (cookie) history.push(`/${this.hookNameApp}`);
    // } catch (error) {
    //   this.setState({
    //     mgsError: error.message,
    //   });
    // }
  }

  render() {
    const { mgsError, open } = this.state;
    return (
      <div>
        <div className="c-activities">
          <div className="c-activities__container">
            <h2 className="c-activities__heading">LOGIN</h2>
            <div className="c-text c-text--error">{mgsError}</div>
            <LoginForm
              onSubmit={this.handleSubmit}
            />
            <div className="c-activities__options">
              <Link to="register">Register?</Link>
              <Link to="forgot-password">Forgot Password?</Link>
            </div>
          </div>
        </div>
        <Loading />
        <ModalFails
          open={open}
          handleCloseModal={this.handleCloseModal}
          handleResend={this.handleResend}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    loadingAction,
    storeAuthLogin,
  }, dispatch)
);

export default withRouter(connect(null, mapDispatchToProps)(Login));
