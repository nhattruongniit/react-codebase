import React from 'react';
import styled, { css } from 'styled-components';
import TrashIcon from '@carbon/icons-react/es/trash-can/16';
import DownloadIcon from '@carbon/icons-react/es/download/16';
import RestartIcon from '@carbon/icons-react/es/restart/16';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #3d70b2;
  width: 100%;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
`;

const SectionItem = styled.div`
  display: flex;
  fill: white;
  color: white;
  font-size: 14px;
  line-height: 1.29;
  padding: 17px 23px;

  ${props => props.clickable && css`
    cursor: pointer;
    font-weight: 600;
  `}

  ${props => props.disabled && css`
    color: #e6e6e657;
    fill: #e6e6e657;
    cursor: not-allowed;
  `}
`;


const ActionButtons = ({
  selectedItemCount,
  clearSelectedItems,
  simulatorItems,
  selectedSimulatorsId,
  apiBaseUrl,
  deleteFn,
  downloadFn,
  setModalConvertFn
}) => {

  const handleConvert = () => {
    const simulation = simulatorItems.filter(item => item.id === selectedSimulatorsId[0]);
    const simulationId = simulation[0].id;
    const simulationName = simulation[0].simulation_name;
    setModalConvertFn(simulationId, simulationName,true)
  }

  return (
    <Container>
      <Section>
        {selectedItemCount === 1 && (
          <SectionItem clickable onClick={handleConvert}>
            Convert &nbsp; <RestartIcon />
          </SectionItem>
        )}
        {selectedItemCount === 1 && (
          <SectionItem clickable onClick={() => downloadFn(apiBaseUrl)}>
            Download &nbsp; <DownloadIcon />
          </SectionItem>
        )}
        <SectionItem clickable onClick={deleteFn}>
          Delete &nbsp; <TrashIcon />
        </SectionItem>
      </Section>
      <Section>
        <SectionItem>
          {selectedItemCount} {selectedItemCount > 1 ? 'Simulations' : 'Simulation'} selected
      </SectionItem>
        <SectionItem onClick={clearSelectedItems} clickable>
          Cancel
        </SectionItem>
      </Section>
    </Container>
  );
}

export default ActionButtons;