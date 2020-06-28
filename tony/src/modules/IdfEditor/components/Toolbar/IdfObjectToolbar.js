import React, { useState } from 'react';
import styled from 'styled-components';
import CopyFile from '@carbon/icons-react/es/copy--file/16';
import ExportIcon from '@carbon/icons-react/es/export/16';
import DeleteIcon from '@carbon/icons-react/es/delete/16';
import {Modal} from 'carbon-components-react';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  height: 48px;
  width: 100%;
  background: #3d70b2;
`;

const ToolbarItem = styled.button`
  border: none;
  padding: none;
  background: transparent;
  margin-right: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.29;
  text-align: left;
  color: #ffffff;
  fill: white;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
`;

const Section = styled.div`
  display: flex;
`;

const IdfObjectToolbar = ({
  cancel,
  selectedObjectCount,
  duplicateFn,
  exportFn,
  deleteFn,
}) => {
  const [isConfirmDeleteProjects, setIsConfirmDeleteProject] = useState(false);
  return (
    <Container>
      <Modal
        open={isConfirmDeleteProjects}
        modalHeading="Are you sure?"
        onRequestClose={() => setIsConfirmDeleteProject(false)}
        onRequestSubmit={() => deleteFn()}
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        danger
        id="confirm-delete-objects-modal"
      >
        <p className="bx--modal-content__text">
          Selected objects will be permanently deleted from your project.
        </p>
      </Modal>
      <Section>
        <ToolbarItem onClick={duplicateFn}>
          Duplicate &nbsp; <CopyFile />
        </ToolbarItem>
        <ToolbarItem onClick={exportFn}>
          Export &nbsp; <ExportIcon />
        </ToolbarItem>
        <ToolbarItem onClick={() => setIsConfirmDeleteProject(true)}>
          Delete &nbsp; <DeleteIcon />
        </ToolbarItem>
      </Section>

      <Section>
        <ToolbarItem style={{ fontWeight: 300 }}>
          { selectedObjectCount } { selectedObjectCount > 1 ? 'items' : 'item' } selected
        </ToolbarItem>
        <ToolbarItem onClick={cancel}>Cancel</ToolbarItem>
      </Section>
    </Container>
  )
}

export default IdfObjectToolbar;
