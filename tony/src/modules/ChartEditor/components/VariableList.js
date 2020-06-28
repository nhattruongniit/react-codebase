import React from 'react';
import styled, { css } from 'styled-components';
import { Checkbox } from 'carbon-components-react';

const Container = styled.div`
  margin-top: 10px;
  flex-grow: 1;
  overflow-y: scroll;
`;

const List = styled.div`
  margin-bottom: 20px;
`;

const SimulationName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const VariableContainer = styled.div`
  width: 100%;
  color: #5a6872;
  font-size: 14px;
  margin-bottom: 5px;

  ${props => props.backgroundColor && css`
    padding: 5px 10px;
    background-color: ${props.backgroundColor};
    color: white;
  `}

  .bx--checkbox-label {
    padding-left: 28px;
  }

  .bx--form-item.bx--checkbox-wrapper:first-of-type {
    margin-top: 0;
  }
`;

const SimulationGroup = styled.div`
`;

const VariableList = ({
  variableGroups,
  selectedVariables,
  toggleVariable,
  checkboxName,
  showBackgroundColor,
}) => (
  <Container>
    {variableGroups.map(({ simulationId, simulationName, variables }) => (
      <SimulationGroup key={simulationId}>
        <SimulationName>{simulationName}</SimulationName>
        <List>
          {variables.length === 0 && 'No available variable'}
          {variables.map(variable => (
            <VariableContainer key={variable.id} backgroundColor={showBackgroundColor ? variable.color : ''}>
              <Checkbox
                id={`${checkboxName}-${variable.id}`}
                labelText={variable.full_name}
                onClick={() => toggleVariable(variable.id)}
                checked={selectedVariables[variable.id] === true}
              />
            </VariableContainer>
          ))}
        </List>
      </SimulationGroup>
    ))}
  </Container>
);

export default VariableList;
