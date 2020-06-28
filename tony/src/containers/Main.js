import { connect } from 'react-redux';
import Main from '../components/Main';

const mapStateToProps = state => ({
  showMenu: state.app.showMenu,
  loading: state.app.loading
});

export default connect(mapStateToProps)(Main);
