import React from 'react';
import styled, { css } from 'styled-components';
import EditIcon from '@carbon/icons-react/es/edit/16';
import TrashIcon from '@carbon/icons-react/es/trash-can/16';
import { Checkbox } from 'carbon-components-react';
import CopyFileIcon from '@carbon/icons-react/es/copy--file/16';
import MaximizeIcon from '@carbon/icons-react/es/maximize/16';
import ChartLineIcon from '@carbon/icons-react/es/chart--line/16';
import CanvasJSIcon from 'assets/images/favicon_canvasjs.ico';

const OverlayContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #3d70b2;
`;

const OverlayActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  padding: 10px;
  position: absolute;
  z-index: 1;
  width: 100%;
  .bx--form-item.bx--checkbox-wrapper:first-of-type {
    margin: 0;
  }
`;

const OverlayButtons = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.div`
  cursor: pointer;
  fill: #5596E6;
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

const Overlay = ({
  id,
  isSelected,
  onToggleSelected,
  deleteFn,
  onRequestRename,
  setMaximizeChartFn,
  duplicateFn,
  isLineChart,
  changeCanvasJS,
  changeReChart,
  amountLineChart
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
        <ButtonWrapper onClick={() => duplicateFn(id)}>
          <CopyFileIcon width={16} height={16} />
        </ButtonWrapper>
        {isLineChart ? amountLineChart >= 5000 ? (
          <ButtonWrapper onClick={() => changeReChart()}>
            <ChartLineIcon width={16} height={16} />
          </ButtonWrapper>
        ) : (
          <ButtonWrapper onClick={() => changeCanvasJS()}>
            <img src={CanvasJSIcon} />
          </ButtonWrapper>
        ) : null}
        <ButtonWrapper onClick={() => deleteFn(id)}>
          <TrashIcon width={16} height={16} />
        </ButtonWrapper>
        <ButtonWrapper onClick={() => setMaximizeChartFn(id, true)}>
          <MaximizeIcon width={16} height={16} />
        </ButtonWrapper>
      </OverlayButtons>
    </OverlayActionBar>
  </OverlayContainer>
);

export default Overlay;
