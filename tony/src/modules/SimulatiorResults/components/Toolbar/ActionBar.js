import React from 'react';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import TrashIcon from '@carbon/icons-react/es/trash-can/16';
import UploadIcon from '@carbon/icons-react/es/upload/16';
import FolderIcon from '@carbon/icons-react/es/folder/16';

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
  cursor: pointer;

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
  chartId,
  clearSelectedItems,
  deleteFn,
  setModalSendViewFn,
  openChartFn,
  match
}) => {
  const { projectId, documentId, simulatorId } = match.params;
  return (
    <Container>
      <Section>
        {chartId.length === 1 && (
          <SectionItem clickabe onClick={() => openChartFn(projectId, documentId, simulatorId, chartId[0])}>
            Open &nbsp; <FolderIcon />
          </SectionItem>
        )}
        <SectionItem clickable onClick={setModalSendViewFn}>
          Send to View &nbsp; <UploadIcon />
        </SectionItem>
        <SectionItem clickable onClick={deleteFn}>
          Delete &nbsp; <TrashIcon />
        </SectionItem>
      </Section>
      <Section>
        <SectionItem>
          {chartId.length} {chartId.length > 1 ? 'items' : 'item'} selected
      </SectionItem>
        <SectionItem onClick={clearSelectedItems} clickable>
          Cancel
        </SectionItem>
      </Section>
    </Container>
  );
}

export default withRouter(ActionButtons);