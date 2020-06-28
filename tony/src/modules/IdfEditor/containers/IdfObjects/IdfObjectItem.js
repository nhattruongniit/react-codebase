import { connect } from 'react-redux';
import {
  toggleSelectObject,
  saveIdfObjectFieldChange
} from '../../reducers/idfObjects';
import IdfObjectItem from '../../components/IdfObjects/IdfObjectItem';

const mapStateToProps = (state, ownProps) => {
  const isSelected =
    state.idfObjects.selectedObjects.indexOf(ownProps.id) !== -1;
  const maxObjectsLength = state.classItem.fields.length;

  return {
    isSelected,
    maxObjectsLength,
    references: state.references
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleSelect: () => dispatch(toggleSelectObject(ownProps.id)),
  onChange: (fieldName, value, extensibleName, extensibleIndex) => {
    return dispatch(
      saveIdfObjectFieldChange(
        ownProps.id,
        fieldName,
        value,
        extensibleName,
        extensibleIndex
      )
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(IdfObjectItem);
