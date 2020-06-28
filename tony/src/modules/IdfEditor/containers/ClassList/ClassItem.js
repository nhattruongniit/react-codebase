import { connect } from 'react-redux';
import ClassItem from '../../components/ClassList/ClassItem';

const mapStateToProps = (state, ownProps) => {
  const classItem = state.classList.items.find(item => item.class_id === ownProps.classId);
  return {
    ...classItem,
  };
}

export default connect(mapStateToProps)(ClassItem);
