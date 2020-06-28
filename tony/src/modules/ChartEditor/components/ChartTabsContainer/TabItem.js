import React from 'react';
import styled, { css } from 'styled-components';
import CloseIcon from '@carbon/icons-react/es/close/16';
import MenuIcon from '@carbon/icons-react/es/overflow-menu--vertical/16';
import PopoverButton from 'components/common/PopoverButton';
import TabItemPopover from './TabItemPopover';

const TabItemContainer = styled.div`
  position: relative;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
  height: 50px;
  min-width: 150px;
  // z-index: 9;
  background: white;
  box-shadow: inset 1px -16px 9px -10px #d9ebfd;
  cursor: pointer;

  ${props =>
    props.isActive &&
    css`
      box-shadow: 3px -8px 6px 5px #d9ebfd;
      z-index: 10;
    `}
`;

const TabName = styled.div`
  text-align: center;
  flex-grow: 1;
`;

const PopoverContent = styled.div`
  z-index: 1000;
`;

const TabItem = ({
  id,
  name,
  options,
  setTabOption,
  closeTab,
  setActiveTab,
  isActive
}) => (
  <TabItemContainer isActive={isActive}>
    <PopoverButton
      icon={<MenuIcon />}
      popoverHeight="auto"
      content={
        <TabItemPopover
          tabId={id}
          options={options}
          setTabOption={setTabOption}
        >
          Some content
        </TabItemPopover>
      }
      popoverPosition="tabMenu"
    />
    <TabName onClick={() => setActiveTab(id)}>{name}</TabName>
    <CloseIcon onClick={() => closeTab(id)} />
  </TabItemContainer>
);

export default TabItem;
