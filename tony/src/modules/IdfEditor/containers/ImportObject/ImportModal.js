import { connect } from 'react-redux';
import { setCategory, addObjects, selectPage } from '../../reducers/importObjects';
import ImportModal from '../../components/ImportObject/ImportModal';

const mapStateToProps = (state) => {
  return {
    className: state.classItem && state.classItem.class_name,
    categories: state.classItem ? state.classItem.categories : [],
    category: state.importObjects.category
  };
}
const mapDispatchToProps = {
    setCategory,
    selectPage,
    addObjects
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportModal);
