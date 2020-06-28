import { connect } from 'react-redux';
import { requestLogin, verifyLogin } from '../reducers/auth';
import App from '../components/App';

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  requestLogin: () => dispatch(requestLogin),
  verifyLogin: () => dispatch(verifyLogin()),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);