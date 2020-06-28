import React, { useState, useEffect } from 'react';
import { Modal, DropdownV2, TextInput } from 'carbon-components-react';
import styled from 'styled-components';
import { Button } from 'carbon-components-react';
import ErrorMessage from '../../../components/common/ErrorMessage';

const StyledModal = styled(Modal)`
  .bx--modal-content {
    overflow-y: ${props => props.open ? 'initial' : 'auto'};
    padding: 0 5px;
  }
`;

const InputWrapper = styled.div`
  margin: 20px 0;
`;

const Label = styled.label`
  display: block;
  letter-spacing: normal;
  text-align: left;
  color: #152935;
  margin-bottom: 8px;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 600;
`;

const CreateDocumentModal = ({
  error,
  isWorking,
  isShowing,
  createDocumentFn,
  createDocumentFromFilesFn,
  cancelFn,
}) => {
  const [title, setTitle] = useState(null);
  const [files, setFiles] = useState(null);
  const fileInputRef = React.createRef();

  function onRequestSubmit() {
    if (files) {
      const filesArray = [...files];
      createDocumentFromFilesFn(filesArray);
    } else if (title) {
      createDocumentFn(title);
    }
  }

  function onRequestClose() {
    if (isWorking) return;
    cancelFn();
  }

  return (
    <StyledModal
      open={isShowing}
      modalHeading="Create New IDF Document"
      onRequestClose={onRequestClose}
      onRequestSubmit={onRequestSubmit}
      primaryButtonText={isWorking ? 'Please wait...' : 'Create'}
      secondaryButtonText="Cancel"
      id="create-document-modal"
    >
      <p className="bx--modal-content__text">
      Please enter title and select default
      <br />
      Template for the new IDF Document
      </p>
      <InputWrapper>
        <TextInput
          placeholder="Enter Title"
          labelText="IDF Document title"
          id="document-title"
          onChange={e => setTitle(e.target.value)}
        />
      </InputWrapper>

      <InputWrapper>
        <p>
        or select IDF File from your computer to Import
        </p>
        <Button
          style={{ marginTop: 10 }}
          onClick={() => fileInputRef.current.click()}>
          { files && files.length > 0 ? `${files.length} file(s) selected` : 'Import IDF'}
        </Button>
        <input
          type="file"
          onChange={e => {
            console.log(e.target.files);
            setFiles(e.target.files)
          }}
          style={{ display: 'none' }}
          ref={fileInputRef}
          accept=".idf"
          multiple
        />
      </InputWrapper>

      { error &&
        <ErrorMessage>{error}</ErrorMessage>
      }
    </StyledModal>
  );
}

export default CreateDocumentModal;
