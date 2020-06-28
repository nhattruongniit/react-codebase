import React from 'react';
import styled, { css } from 'styled-components';
import CopyFileIcon from '@carbon/icons-react/es/copy--file/16';
import TrashIcon from '@carbon/icons-react/es/trash-can/16';
import AddIcon from '@carbon/icons-react/es/add--alt/16';

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
  fill: white;
  color: white;
  font-size: 14px;
  line-height: 1.29;
  padding: 17px 23px;

  span {
    display: inline-block;
    margin-top: -2px;
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
  deleteFn,
  duplicateFn,
  showAddRemoveModalFn,
}) => {
  return (
    <Container>
      <Section>
        <SectionItem clickable onClick={() => showAddRemoveModalFn(true)}>
          <span>Add/Remove Results &nbsp; </span><AddIcon />
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
          {selectedItemCount} {selectedItemCount > 1 ? 'Charts' : 'Chart'} selected
      </SectionItem>
        <SectionItem onClick={clearSelectedItems} clickable>
          Cancel
        </SectionItem>
      </Section>
    </Container>
  );
}

export default ActionButtons;