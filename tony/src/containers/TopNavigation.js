import { connect } from 'react-redux';
import TopNavigation from '../components/TopNavigation';
import { toggleMenu } from '../reducers/app';

const mapStateToProps = state => ({
  showMenu: state.app.showMenu,
});

const mapDispatchToProps = {
  toggleMenu,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNavigation);
