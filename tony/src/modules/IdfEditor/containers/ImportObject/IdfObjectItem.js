import { connect } from 'react-redux';
import { toggleSelectObject, saveIdfObjectFieldChange } from '../../reducers/importObjects';
import IdfObjectItem from '../../components/IdfObjects/IdfObjectItem';

const mapStateToProps = (state, ownProps) => {
  const isSelected = state.importObjects.selectedObjects.indexOf(ownProps.id) !== -1;
  const maxObjectsLength = state.classItem.fields.length;

  return {
    isSelected,
    maxObjectsLength,
    references: state.references,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleSelect: () => dispatch(toggleSelectObject(ownProps.id)),
  onChange: (fieldName, value) => dispatch(saveIdfObjectFieldChange(ownProps.id, fieldName, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IdfObjectItem);


