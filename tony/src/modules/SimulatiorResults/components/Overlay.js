import React from 'react';
import styled, { css } from 'styled-components';
import { withRouter } from 'react-router-dom';
import EditIcon from '@carbon/icons-react/es/edit/16';
import TrashIcon from '@carbon/icons-react/es/trash-can/16';
import { Checkbox } from 'carbon-components-react';
import Button from 'components/common/Button';
import CopyFileIcon from '@carbon/icons-react/es/copy--file/16';
import RestartIcon from '@carbon/icons-react/es/restart/16';
import UploadIcon from '@carbon/icons-react/es/upload/16';

import { openChart } from '../reducers/simulationResult';

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #3d70b2;
    opacity: 0.85;
  }
`;

const OverlayActionBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  padding: 10px;

  .bx--form-item.bx--checkbox-wrapper:first-of-type {
    margin: 0;
  }
`;

const OverlayButtons = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.div`
  cursor: pointer;
  fill: white;
  margin-right: 14px;

  &:last-child {
    margin-right: 0;
  }

  ${props => props.disabled && css`
    cursor: not-allowed;
    color: #e6e6e657;
    fill: #e6e6e657;
  `}
`;

const OpenViewButton = styled(Button)`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background: white;
  color: #3d70b2;
`;

const Overlay = ({
  id,
  isSelected,
  onToggleSelected,
  deleteFn,
  onRequestRename,
  setModalSendViewFn,
  viewFileFn,
  simulatorId,
  fileName,
  isFile,
  clearSelectedItemsFn,
  match,
}) => {
  const handleSentToView = id => {
    clearSelectedItemsFn();
    setModalSendViewFn(true, [id])
  }

  const handleViewFile = () => {
    viewFileFn(simulatorId, fileName)
  }

  const handleOpenChart = () => {
    const { projectId, documentId, simulatorId } = match.params;
    openChart(projectId, documentId, simulatorId, id)
  }
  
  return (
    <OverlayContainer>
      <OverlayActionBar>
        {!isFile && (
          <Checkbox id={`checkbox_${id}`} labelText="" checked={isSelected} hideLabel onChange={() => {
            onToggleSelected(id);
          }} />
        )}

        {!isFile && (
          <OverlayButtons>
            <ButtonWrapper onClick={onRequestRename}>
              <EditIcon />
            </ButtonWrapper>
            <ButtonWrapper>
              <UploadIcon onClick={() => handleSentToView(id)} />
            </ButtonWrapper>
            <ButtonWrapper onClick={() => deleteFn(id)}>
              <TrashIcon />
            </ButtonWrapper>
          </OverlayButtons>
        )}
          
        </OverlayActionBar>
        <OpenViewButton
          borderRadius="0px"
          border="2px solid #3d70b2"
          padding="1em 2em"
          onClick={isFile ? handleViewFile : handleOpenChart}
        >
          Open
        </OpenViewButton>
    </OverlayContainer>
  )
};  

export default withRouter(Overlay);
