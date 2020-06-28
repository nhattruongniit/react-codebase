import React from 'react';
import styled, { css } from 'styled-components';
import CopyFileIcon from '@carbon/icons-react/es/copy--file/16';
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
  fill: white;
  color: white;
  font-size: 14px;
  line-height: 1.29;
  padding: 17px 23px;

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
  selectedItem,
  clearSelectedItems,
  deleteFn,
  duplicateViewFn,
}) => {
  return (
    <Container>
      <Section>
        {selectedItem.length < 2 && (
          <SectionItem clickable onClick={() => duplicateViewFn(selectedItem[0])}>
            Duplicate &nbsp; <CopyFileIcon />
          </SectionItem>
        )}
        <SectionItem clickable onClick={deleteFn}>
          Delete &nbsp; <TrashIcon />
        </SectionItem>
      </Section>
      <Section>
        <SectionItem>
          {selectedItem.length} {selectedItem.length > 1 ? 'Views' : 'View'} selected
      </SectionItem>
        <SectionItem onClick={clearSelectedItems} clickable>
          Cancel
        </SectionItem>
      </Section>
    </Container>
  );
}

export default ActionButtons;