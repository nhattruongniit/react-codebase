import React from 'react';
import styled from 'styled-components';
import Tooltip from 'components/common/Tooltip';

const ChartTooltip = ({ isShowTooltip, closeTooltipFnc }) => {
  return (
    <>
      {isShowTooltip && (
        <TooltipStyled>
          <Tooltip title="Maximum number of charts reached" subtitle="You have reached the maximum of 12 charts per View" kind="error" onCloseButtonClick={closeTooltipFnc} />
        </TooltipStyled>
      )}
    </>
    
  )
}

export default ChartTooltip;

const TooltipStyled = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  .bx--inline-notification__title {
    display: block;
    width: 100%;
  }
  > div {
    display: flex;
    align-items: center;
    width: 600px;
    margin: 0;
  }
`
