import React from 'react';
import styled, { css } from 'styled-components';
import ChevronRight from '@carbon/icons-react/es/chevron--right/32';
import ObjectCount from './ObjectCount';

const Container = styled.div`
  position: relative;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const GroupInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 10px;  
`;

const ChevronIcon = styled(ChevronRight)`
  margin-right: 4px;
  transition: all 0.3s ease;
  width: 20px;
  height: 20px;
  align-self: flex-start;
  margin-top: 3px;


  ${props => props.$isActive && css`
    transform: rotate(90deg);
  `}
`;

const GroupName = styled.div`
  font-size: 16px;  
  line-height: 1.5;  
  color: #152935;
  flex-grow: 1;
  word-wrap: break-word;
`;

const ChildrenContainer = styled.div`
  padding-left: 26px;
  padding-bottom: 5px;
`;

const Group = ({
  groupId,
  name,
  isActive,
  onToggle, 
  children, 
  objects
}) => {  
  return (
    <Container>
      <GroupInfoContainer onClick={() => onToggle(groupId)}>
        <ChevronIcon $isActive={isActive} />
        <GroupName>{name}</GroupName>
        { objects > 0 && 
          <ObjectCount count={objects} />            
        }
      </GroupInfoContainer>    
      { isActive && 
        <ChildrenContainer>{children}</ChildrenContainer>
      }    
    </Container>
  );
};

export default Group;
