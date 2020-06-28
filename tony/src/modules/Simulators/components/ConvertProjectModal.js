import React, { useState } from 'react';
import styled from 'styled-components';
import { Portal } from 'react-portal';
import { Modal, TextInput, RadioButton, Select, SelectItem } from 'carbon-components-react';

const StyledModal = styled(Modal)`
  .bx--modal-header {
    margin-bottom: 0;
  }
  .bx--modal-content {
    overflow-y: hidden
  }
  .bx--modal-container {
    min-width: 650px;
  }
`;

const StyledLabel = styled.div`
  font-size: 14px;
`

const StyledOption = styled.div`
  margin-top: 30px;
  p {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 10px;
  }
`

const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledLeft = styled.div`
  width: 45%;
  input {
    min-width: 100%;
  }
`

const StyledCenter = styled.div`
  margin: 0 20px;
  font-weight: bold;
`

const StyledRight = styled.div`
  width: 45%;
  .bx--select {
    width: 100%;
  }
`

const StyledRadioButton = styled(RadioButton)`
  color: #152935;
  .bx--radio-button__label {
    justify-content: flex-start;
  }
`;

const StyledInfo = styled.div`
  margin-top: 20px;
`

const StyledError = styled.div`
  color: red;
  font-size: 13px;
  margin-top: 10px;
`

const ConvertProjectModal = ({ isShowing, simulationId, simulationName, cancelFn, convertFn }) => {
  const [selectProject, setSelectProject] = useState('');
  const [type, setType] = useState('create-new-project');
  const [errorExistProject, setErrorExistProject] = useState(false);

  const resetError = () => {
    setErrorExistProject(false);
  }

  const handleSubmit = () => {
    resetError();
    if (type === 'send-existing-project') {
      if (!selectProject) {
        setErrorExistProject(true);
        return false;
      }
    }
    cancelFn();
    convertFn(simulationId);
  }

  const handleCancel = () => {
    resetError();
    cancelFn();
  }

  const onChangeType = value => {
    resetError();
    setType(value)
  }

  return (
    <Portal>
      <StyledModal
        open={isShowing}
        primaryButtonText="Convert"
        secondaryButtonText="Cancel"
        modalHeading="Convert to Project"
        onRequestClose={handleCancel}
        onRequestSubmit={handleSubmit}
      >
        <StyledLabel>
          Please choose the destination for the IDF documents
        </StyledLabel>
        <StyledOption>
          <p>Select an option for IDF Documents</p>
          <StyledContent>
            <StyledLeft>
              <StyledRadioButton
                defaultChecked
                name="convert-to-project"
                labelText="Create new Project"
                value="create-new-project"
                onChange={value => onChangeType(value)}
              />
              <StyledInfo>
                <p>Project title</p>
                <TextInput
                  placeholder="Enter Title"
                  id="project-title"
                  value={simulationName}
                  disabled
                />
              </StyledInfo>
            </StyledLeft>
            <StyledCenter>or</StyledCenter>
            <StyledRight>
              <StyledRadioButton
                name="convert-to-project"
                labelText="Send to existing Project"
                value="send-existing-project"
                onChange={value => onChangeType(value)}
              />
              <StyledInfo>
                <p>Select Project</p>
                <Select 
                  hideLabel
                  defaultValue="placeholder"
                  onChange={e => setSelectProject(e.target.value)}
                >
                  <SelectItem disabled value="placeholder" text="Choose project" />
                  <SelectItem value="option-1" text="Option 1" />
                  <SelectItem value="option-2" text="Option 2" />
                </Select>
                {errorExistProject && <StyledError>Please choose project.</StyledError>}
              </StyledInfo>
            </StyledRight>
          </StyledContent>
        </StyledOption>
      </StyledModal>
    </Portal>
  )
};

export default ConvertProjectModal;
