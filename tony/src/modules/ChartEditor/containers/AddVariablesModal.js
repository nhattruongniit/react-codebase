import React from 'react';
import { connect } from 'react-redux';
import AddVariablesModal from '../components/AddVariablesModal';
import { hideModal, fetchChildItems, submitVariables } from '../reducers/addVariables';

const mapStateToProps = state => ({
  ...state.chartEditor.addVariables
});

const mapDispatchToProps = {
  hideModal,
  fetchChildItems,
  submitVariables
};

const AddVariablesModalContainer = ({ isShowing, ...props }) => {
  if (isShowing) {
    return <AddVariablesModal {...props} />
  }
  return <div />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddVariablesModalContainer);
