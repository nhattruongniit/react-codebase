import React from 'react';
import styled, { css } from 'styled-components';
import AddIcon from '@carbon/icons-react/es/add/16';
import TabItem from './TabItem';

const Container = styled.div`
  position: relative;
  background: white;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  z-index: 2000;
  box-shadow: inset 0px -5px 10px 0px #d9ebfd;
`;

const AddButton = styled.div`
  min-width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Content = styled.div`
  flex-grow: 1;
  z-index: 9;
  background: white;
`;

const ChartTabsContainer = ({
  tabs,
  addTab,
  setTabOption,
  closeTab,
  setActiveTab,
  activeTabId,
  children
}) => {
  return (
    <Container>
      <TabsContainer>
        {tabs.map(tabItem => (
          <TabItem
            key={tabItem.id}
            id={tabItem.id}
            options={tabItem.options}
            name={tabItem.name}
            closeTab={closeTab}
            setActiveTab={setActiveTab}
            isActive={tabItem.id === activeTabId}
            setTabOption={setTabOption}
          />
        ))}
        <AddButton onClick={addTab}>
          <AddIcon />
        </AddButton>
      </TabsContainer>
      <Content>{children}</Content>
    </Container>
  );
};

export default ChartTabsContainer;
