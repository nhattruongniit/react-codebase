import { connect } from 'react-redux';
import Header from '../components/Header';
import { setToggleClassList } from '../reducers/classList';

const mapStateToProps = state => {
  return {
    isShowed: state.classList.isShowed,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setToggleClassList: () => {
      dispatch(setToggleClassList());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
