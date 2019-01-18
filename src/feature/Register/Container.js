import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Loading, loadingAction } from 'feature';
import Helper from 'lib/helper';
import RegisterForm from './component/RegisterForm';
import { register } from './api';
import { ModalSuccess } from './component/Modal';

class Register extends Component {
  static propTypes = {
    history: PropTypes.any.isRequired,
    match: PropTypes.object.isRequired,
  }

  constructor() {
    super();
    this.state = {
      mgsError: '',
      open: false,
    };
  }

  componentWillMount() {
    const { history, match: { params: { nameApp } } } = this.props;
    Helper.setStorage('nameApp', nameApp);
    const cookie = Helper.getCookie();
    if (cookie) history.push('profile');
  }

  handleBackLogin = () => {
    const { history } = this.props;
    history.push('login');
  }

  handleSubmit = async (payload) => {
    const nameApp = Helper.getStorage('nameApp');
    try {
      const { loadingAction } = this.props;
      const user = await loadingAction(() => register(nameApp, payload));
      if (user.data) {
        this.setState({ open: true });
      }
    } catch (error) {
      this.setState({ mgsError: error.message });
    }
  }

  render() {
    const { mgsError, open } = this.state;
    return (
      <div>
        <div className="c-activities">
          <div className="c-activities__container">
            <h2 className="c-activities__heading">REGISTER</h2>
            <div className="c-text c-text--error">{mgsError}</div>
            <RegisterForm
              onSubmit={this.handleSubmit}
            />
            <div className="c-activities__options c-activities__options--center">
              <Link to="login">Login?</Link>
            </div>
          </div>
          <Loading />
          <ModalSuccess
            open={open}
            handleBackLogin={this.handleBackLogin}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    loadingAction,
  }, dispatch)
);

export default withRouter(connect(null, mapDispatchToProps)(Register));
