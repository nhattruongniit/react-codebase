import { connect } from 'react-redux';
import { processLoginCallback, requestLogin } from '../../reducers/auth';
import LoginCallbackPage from '../../components/AuthPage/LoginCallbackPage';

const mapStateToProps = state => ({
  error: state.auth.error,
});

const mapDispatchToProps = {
  processLoginCallback,
  requestLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginCallbackPage);
