import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import CloseIcon from '@carbon/icons-react/es/close/16';
import MenuIcon from '@carbon/icons-react/es/menu/16';
import VariableList from '../VariableList';
import ChartForm from './ChartForm';
import VariableSections from './VariableSections';

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  box-shadow: 2px 2px 10px #d9ebfd;
  min-width: 400px;
  width: 400px;
  background: white;
  z-index: 11;

  ${props =>
    props.minimize &&
    css`
      min-width: 37px;
      width: 37px;
    `}
`;

const Header = styled.div`
  position: relative;
  text-align: center;
  text-transform: capitalize;
  height: 40px;
  color: #5a6872;
  padding-top: 20px;
`;

const CloseButton = styled.div`
  position: absolute;
  right: 10px;
  top: 21px;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 10px;
  height: calc(100% - 30px);
  display: flex;
  flex-direction: column;
`;

const ControlCentrePanel = ({
  variableGroups,
  toggleSelected,
  selectedVariables,
  formValues,
  setValue,
  submitForm,
  clearForm,
  chart,
  sectionLength,
  setSectionLength,
  activeSectionId,
  setActiveSection,
  plottedType,
  setPlottedType,
  setSectionDateTime,
}) => {
  const [isShowing, setIsShowing] = useState(true);

  function toggleIsShowing() {
    if (isShowing) {
      setIsShowing(false);
    } else {
      setIsShowing(true);
    }
  }

  return (
    <Container minimize={!isShowing}>
      <Header>
        {isShowing && 'CONTROL CENTRE'}
        <CloseButton onClick={toggleIsShowing}>
          {isShowing ? (
            <CloseIcon fill="#5A6872" />
          ) : (
            <MenuIcon fill="#5A6872" />
          )}
        </CloseButton>
      </Header>
      {isShowing && (
        <Content>
          <ChartForm
            formValues={formValues}
            setValue={setValue}
            submitForm={submitForm}
            clearForm={clearForm}
            chart={chart}
            sectionLength={sectionLength}
            setSectionLength={setSectionLength}
            plottedType={plottedType}
            setPlottedType={setPlottedType}
          />
          {plottedType === 'single' &&
            <VariableList
              variableGroups={variableGroups}
              toggleVariable={toggleSelected}
              selectedVariables={selectedVariables}
              checkboxName="control-centre-variable-checkbox"
              showBackgroundColor
            />
          }
          {plottedType === 'group' &&
            <VariableSections
              sections={variableGroups}
              toggleVariable={toggleSelected}
              selectedVariables={selectedVariables}
              activeSectionId={activeSectionId}
              setActiveSection={setActiveSection}
              setSectionDateTime={setSectionDateTime}
            />
          }

        </Content>
      )}
    </Container>
  );
};

export default ControlCentrePanel;
