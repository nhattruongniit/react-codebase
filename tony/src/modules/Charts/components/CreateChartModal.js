import React, { useState } from 'react';
import { Modal } from 'carbon-components-react';
import styled from 'styled-components';
import ErrorMessage from 'components/common/ErrorMessage';

// component
import TreeView from '../../../components/common/TreeView';

const StyledModal = styled(Modal)`
  z-index: 2 !important;
  .bx--modal-content {
    overflow-y: ${props => props.open ? 'initial' : 'auto'};
    padding: 0 5px;
  }
  .bx--modal-content__text {
    margin-bottom: 15px;
  }
`;

const NumberChartStyled = styled.p`
  padding: 0 0 30px 0;
  b {
    color: ${props => props.color}
  }
`

const TextErrorStyled = styled.p`
  color: #f00;
  font-size: 14px;
  margin-bottom: 10px;
`

const CreateChartModal = ({
  error,
  isWorking,
  isShowing,
  viewId,
  currentCharts,
  cancelFn,
  addChartsToViewFn,
  deleteSelectChartFn,
  fetchTreeViewData,
  treeViewData
}) => {
  const [maxiumChart, setMaxiumChart] = useState(false);
  const [selectedCharts, setSelectedCharts] = useState([]);
  const [chartOwner, setChartOwner] = useState([]);
  
  const existedCharts = currentCharts.some(chart => selectedCharts.indexOf(chart.id) > - 1);

  const resetUseState = () => {
    setMaxiumChart(false);
    setSelectedCharts([]);
    setChartOwner([]);
  }

  const onRequestSubmit = () => {
    const totalChart = selectedCharts.length + currentCharts.length;
    if(selectedCharts.length === 0) return false;
    if(totalChart > 12) return false;
    if(existedCharts) return false;
    resetUseState();
    addChartsToViewFn(viewId, selectedCharts, null, chartOwner);
    deleteSelectChartFn();
  }

  const onRequestClose = ()  => {
    if (isWorking) return;
    cancelFn();
    deleteSelectChartFn();
  }

  const onSelectCharts = selectedItems => {
    const ids = selectedItems.map(item => item.id);
    const getChartOwner = selectedItems.map(item => item.chartOwner);
    const totalChart = selectedItems.length + currentCharts.length;
    setSelectedCharts(ids);
    setChartOwner(getChartOwner);
    if (totalChart === 12) {
      setMaxiumChart(true);
    } else {
      setMaxiumChart(false);
    }
  }

  return (
    <StyledModal
      open={isShowing}
      modalHeading="Add charts to the View"
      onRequestClose={onRequestClose}
      onRequestSubmit={onRequestSubmit}
      primaryButtonText={isWorking ? 'Please wait...' : 'Create'}
      secondaryButtonText="Cancel"
      id="create-view-modal"
    >
      {existedCharts && <TextErrorStyled>This charts existed. Please choose other charts.</TextErrorStyled>}
      <NumberChartStyled color={selectedCharts.length + currentCharts.length > 12 ? '#f00' : '#152935'}>
        Number of chart currently in the View: <b>{selectedCharts.length + currentCharts.length}</b>
      </NumberChartStyled>
      <p className="bx--modal-content__text">
        Please select IDF Documents and Simulations to include their chart into the new view:
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

export default CreateChartModal;
