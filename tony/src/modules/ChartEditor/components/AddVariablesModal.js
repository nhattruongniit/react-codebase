import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Modal,
  FormGroup,
  RadioButtonGroup,
  RadioButton
} from 'carbon-components-react';
import MultiLevelTree from './MultilevelTree';
import { ADD_VARIABLES_TYPES } from '../reducers/addVariables';

const StyledRadioButtonGroup = styled(RadioButtonGroup)`
  &.bx--radio-button-group {
    flex-direction: column;
    align-items: flex-start;
  }

  .radioButtonWrapper {
    margin-bottom: 10px;
  }
`;

const Instruction = styled.div`
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const AddVariablesModal = ({
  hideModal,
  treeData,
  fetchChildItems,
  submitVariables
}) => {
  const [selectedSimulationId, setSelectedSimulationId] = useState(null);
  const [addType, setAddType] = useState(ADD_VARIABLES_TYPES.ALL_VARIABLES);

  function onSubmit() {
    submitVariables(addType, selectedSimulationId);
  }

  return (
    <Modal
      open
      modalHeading="Add variables"
      primaryButtonText="OK"
      secondaryButtonText="Cancel"
      onRequestClose={hideModal}
      onRequestSubmit={onSubmit}
    >
      <FormGroup legendText="Variables">
        <StyledRadioButtonGroup valueSelected={addType} onChange={setAddType}>
          <RadioButton
            value={ADD_VARIABLES_TYPES.PLOTTED_VARIABLES}
            labelText="Add plotted variables"
          />
          <RadioButton
            value={ADD_VARIABLES_TYPES.ALL_VARIABLES}
            labelText="Add all variables"
          />
        </StyledRadioButtonGroup>
      </FormGroup>

      <Instruction>Please select Simulation results</Instruction>

      <MultiLevelTree
        treeData={treeData}
        onExpand={fetchChildItems}
        onSelectItem={item => setSelectedSimulationId(item.id)}
      />
    </Modal>
  );
};

export default AddVariablesModal;
