import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import EditIcon from '@carbon/icons-react/es/edit/16';
import TrashIcon from '@carbon/icons-react/es/trash-can/16';
import { Checkbox } from 'carbon-components-react';
import Button from 'components/common/Button';
import CopyFileIcon from '@carbon/icons-react/es/copy--file/16';

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
  projectId,
  id,
  isSelected,
  onToggleSelected,
  deleteFn,
  onRequestRename,
  duplicateViewFn
  }) => (
  <OverlayContainer>
    <OverlayActionBar>
      <Checkbox id={`checkbox_${id}`} labelText="" checked={isSelected} hideLabel onChange={() => {
        onToggleSelected(id);
      }} />
      <OverlayButtons>
        <ButtonWrapper onClick={onRequestRename}>
          <EditIcon width={16} height={16} />
        </ButtonWrapper>
        <ButtonWrapper onClick={() => duplicateViewFn(id)}>
          <CopyFileIcon width={16} height={16} />
        </ButtonWrapper>
        <ButtonWrapper onClick={() => deleteFn(id)}>
          <TrashIcon width={16} height={16} />
        </ButtonWrapper>
      </OverlayButtons>
    </OverlayActionBar>
    <Link to={`/dashboard/${projectId}/views/${id}/charts`}>
      <OpenViewButton
        borderRadius="0px"
        border="2px solid #3d70b2"
        padding="1em 2em"
      >
        Open
      </OpenViewButton>
    </Link>
  </OverlayContainer>
);

export default Overlay;
