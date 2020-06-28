import React, { useState } from 'react';
import styled from 'styled-components';
import { Portal } from 'react-portal';
import { Modal } from 'carbon-components-react';
import ChevronDownIcon from '@carbon/icons-react/es/chevron--down/16';

const StyledModal = styled(Modal)`
  &.bx--modal.is-visible {
    z-index: 10;
  }
  .bx--modal-footer {
    display: none;
  }

  .bx--modal-header {
    margin-bottom: 0;
  }
  
  .bx--modal-content {
    margin-bottom: 0;
    height: 100%;
  }

  .bx--modal-container {
    min-width: 1024px;
    height: 620px;
    padding: 2.5rem 3rem;
  }

  @media (max-width: 1024px) {
    .bx--modal-container {
      min-width: 95%;
    }
  } 
`;

const StyledContent = styled.div`
  padding: 0 20px;
`

const ViewLogModal = ({ isShowing, cancelFn, dataFile }) => {
  return (
    <Portal>
      <StyledModal
        open={isShowing}
        onRequestClose={cancelFn}
      >
        <StyledContent >
          <pre>
           {dataFile}
          </pre>
        </StyledContent>
      </StyledModal>
    </Portal>
  )
};

export default ViewLogModal;
