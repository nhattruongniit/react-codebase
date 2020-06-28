import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import CloseIcon from '@carbon/icons-react/es/close/16';
import PopoverMenuIcon from '@carbon/icons-react/es/overflow-menu--vertical/16';
import PopoverButton, { Popover } from 'components/common/PopoverButton';
import MenuIcon from '@carbon/icons-react/es/menu/16';
import { Search, Select, SelectItem } from 'carbon-components-react';
import _ from 'lodash';
import VariableList from './VariableList';

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  box-shadow: -2px 2px 10px #d9ebfd;
  min-width: 380px;
  width: 380px;
  background: white;
  z-index: 11;

  ${props =>
    props.minimize &&
    css`
      width: 37px;
      min-width: 37px;
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
  left: 10px;
  top: 21px;
  cursor: pointer;
`;

const PopoverWrapper = styled.div`
  position: absolute;
  top: 21px;
  right: 10px;
`;

const Content = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: calc(100% - 30px);
`;

const FormContainer = styled.div`
  margin-top: 10px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const StyledSelect = styled(Select)`
  &.bx--select {
    width: 150px;
  }

  .bx--select-option {
    text-transform: uppercase;
  }
`;

const PointStyled = styled.div`
  cursor: pointer;
`

const steps = [
  'all',
  'detailed',
  'timestep',
  'hourly',
  'daily',
  'monthly',
  'runperiod',
  'environment',
  'annual'
];

const VariablesPanel = ({
  variablesBySimulations,
  filters,
  selectedVariables,
  toggleVariable,
  setFilter,
  removeFilter,
  showAddVariablesModal,
  showRemoveSimulationResultsModal,
  units,
}) => {
  const allUnits = ['all', ...units];
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
        <CloseButton onClick={toggleIsShowing}>
          {isShowing ? (
            <CloseIcon fill="#5A6872" />
          ) : (
            <MenuIcon fill="#5A6872" />
          )}
        </CloseButton>
        {isShowing && 'VARIABLES'}
        {isShowing && (
          <PopoverWrapper>
            <PopoverButton
              width="220px"
              icon={<PopoverMenuIcon />}
              popoverPosition="variables"
              content={
                <PointStyled>
                  <div onClick={showAddVariablesModal}>
                    Add simulation results...
                  </div>
                  <br />
                  <div onClick={showRemoveSimulationResultsModal}>Remove simulation results...</div>
                </PointStyled>
              }
            />
          </PopoverWrapper>
        )}
      </Header>
      {isShowing && (
        <Content>
          <FormContainer>
            <FormRow>
              <StyledSelect
                id="variables-step-select"
                labelText="Steps"
                value={filters.step || ''}
                onChange={e => {
                  const value = e.target.value;
                  if (value === 'all') {
                    removeFilter('step');
                  } else {
                    setFilter('step', value);
                  }
                }}
              >
                {steps.map(step => (
                  <SelectItem
                    key={step}
                    value={step}
                    text={step}
                    text={_.upperFirst(step)}
                  />
                ))}
              </StyledSelect>
              <StyledSelect
                id="variables-unit-select"
                labelText="Units"
                value={filters.units || ''}
                onChange={e => {
                  const value = e.target.value;
                  if (value === 'all') {
                    removeFilter('units');
                  } else {
                    setFilter('units', value);
                  }
                }}
              >
                {allUnits.map(type => (
                  <SelectItem
                    key={type}
                    value={type}
                    text={_.upperFirst(type)}
                  />
                ))}
              </StyledSelect>
            </FormRow>
            <FormRow>
              <Search
                placeHolderText="Search"
                value={filters.keyword || ''}
                onChange={e => {
                  const text = e.target.value;
                  if (text && text.length > 0) {
                    setFilter('keyword', text);
                  } else {
                    removeFilter('keyword');
                  }
                }}
              />
            </FormRow>
          </FormContainer>
          <VariableList
            variableGroups={variablesBySimulations}
            toggleVariable={toggleVariable}
            selectedVariables={selectedVariables}
            checkboxName="variable-panel-checkbox"
          />
        </Content>
      )}
    </Container>
  );
};

export default VariablesPanel;
