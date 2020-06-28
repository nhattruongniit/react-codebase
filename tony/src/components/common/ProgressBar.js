import React, { memo } from 'react';
import styled, { css } from 'styled-components';; 

const StyledColProcess = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`
const ProcessBgStyled= styled.div`
  height: 4px;
  width: 100%;
  background-color: #8897A2;
  position: relative;
  margin-right: 1em;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background-color: #3D70B2;
    height: 100%;
    width: 0%;
    ${props => props.hasAnimate && css ` 
      -webkit-animation: progessbar 1s linear 1s forwards;
      animation: progessbar 1s linear 1s forwards;
    `}
  }
  @-webkit-keyframes progessbar {
    from { 
      width: 0%
    }
    to {
      width: ${props => props.progress}%;
    }
  }
  @keyframes progessbar {
    from { 
      width: 0%
    }
    to {
      width: ${props => props.progress}%;
    }
  }
`

const DefaultPage = memo(({ item }) => {
  return (
    <StyledColProcess>
      <ProcessBgStyled progress={item.progress} hasAnimate={item.status === 'in progress'}/>  
      <div>{item.progress}%</div>
    </StyledColProcess>
  )
});

export default DefaultPage;