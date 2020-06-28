import React, { useState } from 'react';
import styled from 'styled-components';

const ResizeBarContainer = styled.div`
  height: 100%;
  width: 2px;
  background: rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const StaticBar = styled.div.attrs({
  style: ({left}) => ({
    left: `${left}px`,
  }),
})`
  position: absolute;
  top: 0;
  left: ${props => props.left + 2}px;
  width: 2px;  
  height: 100%;
  cursor: 'col-resize';    
`;

const HandleBar = styled(StaticBar)`
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const WidthResizer = ({ onChange, width, theme }) => {  
  let internalIsDragging = false;
  const [isDragging, setIsDragging] = useState(false);
  const [handleBarPosition, setHandleBarPosition] = useState(width);

  function startResize() {    
    setIsDragging(true);
    internalIsDragging = true;
    document.querySelector('body').style.cursor = 'col-resize';
    document.addEventListener('mousemove', onDragging, true);
    document.addEventListener('mouseup', endResize, true);    
  }

  function onDragging(e) {    
    if (!internalIsDragging) return;    
    setHandleBarPosition(e.pageX);
  }

  function endResize(e) {    
    if (!internalIsDragging) return;
    const position = e.clientX;
    onChange(position);
    setIsDragging(false);
    internalIsDragging = false;
    document.removeEventListener('mousemove', onDragging, true);
    document.removeEventListener('mouseup', endResize, true);
    document.querySelector('body').style.cursor = 'default';
  }

  return (
    <ResizeBarContainer>
      <StaticBar left={width} onMouseDown={startResize} />
      { isDragging && 
        <HandleBar left={handleBarPosition} />
      }      
    </ResizeBarContainer>
  );
}

export default WidthResizer;
