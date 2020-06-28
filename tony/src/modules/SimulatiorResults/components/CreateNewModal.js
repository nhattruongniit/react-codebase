import React, { useState } from 'react';
import styled from 'styled-components';
import { Portal } from 'react-portal';
import { Modal, TextInput, RadioButton } from 'carbon-components-react';

const StyledModal = styled(Modal)`
  .bx--modal-header {
    margin-bottom: 0;
  }
  .bx--modal-content {
    overflow-y: hidden
  }
  .bx--modal-container {
    min-width: 500px;
  }
  .bx--modal-footer {
    button {
      min-width: 80px;
    }
  }
`;

const StyledOption = styled.div`
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
  width: 55%;
  input {
    min-width: 100%;
  }
`

const StyledRight = styled.div`
  width: 35%;
  .bx--select {
    width: 100%;
  }
`

const StyledInfo = styled.div`
  margin-top: 20px;
`

const StyledRadioButton = styled(RadioButton)`
  color: #152935;
  margin-top: 20px;
  .bx--radio-button__label {
    justify-content: flex-start;
  }
`;

const ErrorStyled = styled.p`
  color: #f00;
  font-size: 12px;
  margin-top: 3px;
`

const ConvertProjectModal = ({ isShowing, cancelFn, createNewChartFn, simulatorId }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('line');
  const [source, setSource] = useState('variables')
  const [error, setError] = useState(false);
  let options = {}

  const onChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    if (name === '' ) {
      setError(true);
      return false;
    }

    if (source === 'variables') {
      options = { variables: [] }
    } else {
      options = { meters: [] }
    }
    setError(false);
    setName('')
    createNewChartFn(name, simulatorId,type, options)
    cancelFn();
  }

  const handleCancel = () => {
    cancelFn();
    setError(false);
  }

  return (
    <Portal>
      <StyledModal
        open={isShowing}
        primaryButtonText="Ok"
        secondaryButtonText="Cancel"
        modalHeading="Create new Chart"
        onRequestClose={handleCancel}
        onRequestSubmit={handleSubmit}
      >
        <StyledOption>
          <StyledContent>
            <StyledLeft>
              <StyledInfo>
                <p>Chart title</p>
                <TextInput
                  placeholder="Enter Title"
                  id="project-title"
                  onChange={onChange}
                />
                {error && <ErrorStyled>Please enter title</ErrorStyled>}
              </StyledInfo>
              <StyledInfo>
                <p>Source</p>
                <StyledRadioButton
                  defaultChecked
                  name="source"
                  labelText="Variables"
                  value="variables"
                  onChange={value => setSource(value)}
                />
                <StyledRadioButton
                  name="source"
                  labelText="Meters"
                  value="meters"
                  onChange={value => setSource(value)}
                />
              </StyledInfo>
            </StyledLeft>
            <StyledRight>
              <StyledInfo>
                <p>Chart type</p>
                <StyledRadioButton
                  defaultChecked
                  name="chart"
                  labelText="Line chart"
                  value="line"
                  onChange={value => setType(value)}
                />
                <StyledRadioButton
                  name="chart"
                  labelText="bar chart"
                  value="bar"
                  onChange={value => setType(value)}
                />
                <StyledRadioButton
                  name="chart"
                  labelText="Pie chart"
                  value="pie"
                  onChange={value => setType(value)}
                />
                <StyledRadioButton
                  name="chart"
                  labelText="Scatter chart"
                  value="radar"
                  onChange={value => setType(value)}
                />
              </StyledInfo>
            </StyledRight>
          </StyledContent>
        </StyledOption>
      </StyledModal>
    </Portal>
  )
};

export default ConvertProjectModal;
