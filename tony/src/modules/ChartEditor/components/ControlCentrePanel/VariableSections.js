import React from 'react';
import styled, { css } from 'styled-components';
import { Checkbox, TextInput } from 'carbon-components-react';

const Container = styled.div`
  overflow-y: scroll;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const SectionTitle = styled(Title)`
  margin-bottom: 0;
`;

const VariableList = styled.div`
  ${props =>
    props.isActive &&
    css`
      border: 2px solid #3d70b2;
    `}
`;

const VariableContainer = styled.div`
  width: 100%;
  color: #5a6872;
  font-size: 14px;
  margin-bottom: 5px;

  ${props =>
    props.backgroundColor &&
    css`
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

const ChooseLeadVariableText = styled.div`
  padding: 10px;
  background-color: #dfe3e6;
`;

const DateTimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DateTimeInput = styled(TextInput)`
  min-width: 85px;
  padding: 0 10px;
`;

const VariableSections = ({
  activeSectionId,
  sections,
  selectedVariables,
  toggleVariable,
  setActiveSection,
  setSectionDateTime
}) => {
  return (
    <Container>
      <Title>Selected Variables / Sections</Title>

      {sections.map((section, index) => {
        const isActive = activeSectionId === section.id;
        return (
          <Section key={section.id}>
            <SectionTitleContainer>
              <SectionTitle onClick={() => setActiveSection(section.id)}>
                {section.variables.length === 0
                  ? `Section ${index + 1}`
                  : section.variables[0].full_name}
              </SectionTitle>
            </SectionTitleContainer>

            <DateTimeContainer>
              <DateTimeInput
                type="number"
                id="month-input"
                labelText="Month"
                onChange={e =>
                  setSectionDateTime(section.id, 'month', e.target.value)
                }
              />
              <DateTimeInput
                type="number"
                id="month-input"
                labelText="Date"
                onChange={e =>
                  setSectionDateTime(section.id, 'date', e.target.value)
                }
              />
              <DateTimeInput
                type="number"
                id="month-input"
                labelText="Hour"
                onChange={e =>
                  setSectionDateTime(section.id, 'hour', e.target.value)
                }
              />
              <DateTimeInput
                type="number"
                id="month-input"
                labelText="Minute"
                onChange={e =>
                  setSectionDateTime(section.id, 'minute', e.target.value)
                }
              />
            </DateTimeContainer>

            <VariableList isActive={isActive}>
              {isActive && section.variables.length === 0 && (
                <ChooseLeadVariableText>
                  Choose lead variable
                </ChooseLeadVariableText>
              )}
              {!isActive && section.variables.length === 0 && (
                <ChooseLeadVariableText
                  onClick={() => setActiveSection(section.id)}
                >
                  Click here to activate the section
                </ChooseLeadVariableText>
              )}
              {section.variables.map(variable => (
                <VariableContainer
                  key={variable.id}
                  backgroundColor={variable.color}
                >
                  <Checkbox
                    id={`variable-section-${section.id}-${variable.id}`}
                    labelText={variable.full_name}
                    onClick={() => toggleVariable(variable.id)}
                    checked={selectedVariables[variable.id] === true}
                  />
                </VariableContainer>
              ))}
            </VariableList>
          </Section>
        );
      })}
    </Container>
  );
};

export default VariableSections;
