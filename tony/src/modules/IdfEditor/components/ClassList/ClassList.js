import React, { useState } from 'react';
import styled from 'styled-components';
import Group from './Group';
import ClassItem from '../../containers/ClassList/ClassItem';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 50px);
  background: white;
  overflow-y: ${props => props.isShowed ? 'scroll' : 'hidden'};
`;

const ClassList = ({ groups, isShowed, activeClassId, selectGroup, activeGroupId, width, selectClass }) => {
  const toggleGroup = (groupId) => {
    if (!activeGroupId || activeGroupId !== groupId) {
      selectGroup(groupId);
    } else {
      selectGroup(null);
    }
  }

  return (
    <Container width={width} isShowed={isShowed}>
      {isShowed && groups.map(group => (
        <Group
          key={group.group_id}
          name={group.group_name}
          onToggle={toggleGroup}
          isActive={activeGroupId === group.group_id}
          groupId={group.group_id}
          objects={group.objects}
        >
          {group.items.map(classItemId => (
            <ClassItem
              classId={classItemId}
              selectClass={selectClass}
              key={classItemId}
              isActive={activeClassId === classItemId}
            />
          ))}
        </Group>
      ))}
    </Container>
  );
}

export default ClassList;
