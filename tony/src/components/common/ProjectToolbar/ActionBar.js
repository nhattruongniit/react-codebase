import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Modal } from 'carbon-components-react';
import { Portal } from 'react-portal';
import CopyFileIcon from '@carbon/icons-react/es/copy--file/16';
import RestartIcon from '@carbon/icons-react/es/restart/16';
import TrashIcon from '@carbon/icons-react/es/trash-can/16';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #3d70b2;
  width: 100%;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
`;

const SectionItem = styled.div`
  display: flex;
  margin-right: 24px;
  fill: white;
  color: white;
  font-size: 14px;
  line-height: 1.29;
  padding: 17px 23px;

  &:last-child {
    margin-right: 0;
  }

  ${props => props.clickable && css`
    cursor: pointer;
    font-weight: 600;
  `}

  ${props => props.disabled && css`
    color: #e6e6e657;
    fill: #e6e6e657;
    cursor: not-allowed;
  `}
`;


const ActionButtons = ({
  selectedItemCount,
  clearSelectedItems,
  showUpgradeModalFn,
  deleteFn,
  duplicateFn,
  isUpgradeable,
}) => {
  return (
    <Container>
      <Section>
        <SectionItem clickable onClick={() => {
          if (isUpgradeable) {
            showUpgradeModalFn();
          }
        }} disabled={!isUpgradeable}>
          Upgrade &nbsp; <RestartIcon />
        </SectionItem>
        <SectionItem clickable onClick={duplicateFn}>
          Duplicate &nbsp; <CopyFileIcon />
        </SectionItem>
        <SectionItem clickable onClick={deleteFn}>
          Delete &nbsp; <TrashIcon />
        </SectionItem>
      </Section>
      <Section>
        <SectionItem>
          {selectedItemCount} IDF {selectedItemCount > 1 ? 'projects' : 'project'} selected
      </SectionItem>
        <SectionItem onClick={clearSelectedItems} clickable>
          Cancel
        </SectionItem>
      </Section>
    </Container>
  );
}

export default ActionButtons;