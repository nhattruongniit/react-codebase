import { connect } from 'react-redux';
import ClassList from '../../components/ClassList';
import * as actions from '../../reducers/classList';

const mapStateToProps = state => ({
  groups: state.classList.groups,
  activeClassId: state.classList.activeClassId,
  activeGroupId: state.classList.activeGroupId,
  isShowed: state.classList.isShowed,
});

export default connect(mapStateToProps, actions)(ClassList);
