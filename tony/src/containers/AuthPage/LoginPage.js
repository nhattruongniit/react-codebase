import { connect } from 'react-redux';
import { requestLogin } from '../../reducers/auth';
import LoginPage from '../../components/AuthPage/LoginPage';

const mapDispatchToProps = {
  requestLogin,
};

export default connect(null, mapDispatchToProps)(LoginPage);
