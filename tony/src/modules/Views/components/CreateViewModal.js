import React, { useState } from 'react';
import { Modal, TextInput } from 'carbon-components-react';
import styled from 'styled-components';
import ErrorMessage from 'components/common/ErrorMessage';
import TreeView from '../../../components/common/TreeView';

const StyledModal = styled(Modal)`
  z-index: 2 !important;
  .bx--modal-content {
    padding: 0 5px;
    overflow-y: hidden;
  }
  .bx--modal-content__text {
    margin-bottom: 15px;
  }
  .bx--modal-container {
    max-height: 100%;
  }
`;

const InputWrapper = styled.div`
  margin: 20px 0;
`;

const TextErrorStyled = styled.p`
  color: #f00;
  font-size: 14px;
`

const CreateViewModal = ({
  error,
  isWorking,
  isShowing,
  project,
  cancelFn,
  addChartsToViewFn,
  fetchTreeViewData,
  treeViewData
}) => {
  const [viewName, setViewName] = useState('');
  const [isFilled, setIsFilled] = useState(false);
  const [maxiumChart, setMaxiumChart] = useState(false);
  const [selectedCharts, setSelectedCharts] = useState([]);

  const resetUseState = () => {
    setViewName('');
    setIsFilled(false);
    setMaxiumChart(false);
    setSelectedCharts([]);
  }

  const onRequestSubmit = () => {
    if(!viewName || selectedCharts.length === 0) {
      setIsFilled(true);
      return false;
    }
    if (selectedCharts.length > 12) {
      setMaxiumChart(true);
      return false;
    }
    const projectId = project.id;
    addChartsToViewFn(viewName, projectId, selectedCharts);
    resetUseState();
  }

  const onRequestClose = ()  => {
    if (isWorking) return;
    cancelFn();
    resetUseState();
  }

  const onSelectCharts = selectedItems => {
    const ids = selectedItems.map(item => item.id);
    setSelectedCharts(ids);
    if (selectedItems.length > 12) {
      setMaxiumChart(true);
    } else {
      setMaxiumChart(false);
    }
  }

  return (
    <StyledModal
      open={isShowing}
      modalHeading="Create New View"
      onRequestClose={onRequestClose}
      onRequestSubmit={onRequestSubmit}
      primaryButtonText={isWorking ? 'Please wait...' : 'Create'}
      secondaryButtonText="Cancel"
      id="create-view-modal"
    >
      {isFilled && <TextErrorStyled>Please enter view title, choose charts</TextErrorStyled>}
      {maxiumChart && <TextErrorStyled>You can only choose maxium 12 charts</TextErrorStyled>}
      <InputWrapper>
        <TextInput
          placeholder="Enter Title"
          labelText="View Title"
          id="view-title"
          value={viewName}
          onChange={e => setViewName(e.target.value)}
        />
      </InputWrapper>
      <p className="bx--modal-content__text">
        Please select IDF Documents and Simulations to include their chart (max 12) into the new view:
      </p>

      <TreeView
        treeData={treeViewData}
        onExpand={fetchTreeViewData}
        onSelectItems={onSelectCharts}
      />

      { error &&
        <ErrorMessage>{error}</ErrorMessage>
      }
    </StyledModal>
  );
}

export default CreateViewModal;
