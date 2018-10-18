import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';

class Login extends Component {
  
  static propTypes = {
    actions: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired
  };

  componentDidMount() {
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.actions.Login().then(res => {
      console.log(res, this.props.login.showLoading);
    })
    .catch(err => {
      console.log('err: ', err, this.props.login.showLoading);
    });
  }
  
  render() {

    return (
      <div>this is login</div>
    )
  };
}

function mapStateToProps(state) {
  return {
    login: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
