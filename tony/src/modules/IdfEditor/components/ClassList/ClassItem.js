import React from 'react';
import styled, { css } from 'styled-components';
import ObjectCount from './ObjectCount';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 8px;
  background-color: white;
  margin-bottom: 2px;
  cursor: pointer;
  align-items: center;

  ${props => props.isActive && css`
    background-color: rgba(85, 150, 230, 0.1);

    ${ClassName} {
      font-weight: bold;
    }
  `}

  &:first-child {
    padding-top: 0;
  }
`;

const ClassName = styled.div`
  font-size: 14px;  
  line-height: 2.14;  
  text-align: left;
  color: #152935;
  word-wrap: break-word;
  max-width: calc(100% - 30px);
`;

const ClassItem = ({
  classId,
  class_name,
  isActive,
  selectClass,
  objects,
  match,
}) => (
  <Container isActive={isActive} onClick={() => selectClass(classId, class_name)}>
    <ClassName>{class_name}</ClassName>
    { objects > 0 && 
      <ObjectCount count={objects} />
    }
  </Container>
);

export default ClassItem;
