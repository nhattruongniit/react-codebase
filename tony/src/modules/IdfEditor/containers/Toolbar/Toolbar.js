import { connect } from 'react-redux';
import Toolbar from '../../components/Toolbar';
import { setFilterFieldName, addObject } from '../../reducers/idfObjects';

const mapStateToProps = state => ({
  categories: state.classItem ? state.classItem.categories : [],
  hasSelectedObjects: state.idfObjects.selectedObjects.length > 0,
})
const mapDispatchToProps = {
  setFilterFieldName,
  addObject
};
export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
