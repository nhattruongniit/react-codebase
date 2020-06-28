import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Checkbox } from 'carbon-components-react';
import _ from 'lodash';
import IdfObjectInput from './IdfObjectInput';

const Container = styled.div`
  margin-right: 5px;
  height: max-content;
`;

const Row = styled.div`
  width: max-content;
  min-width: 100%;
  border: 1px solid #dfe3e6;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
  line-height: 3.43;
  text-align: left;
  color: #152935;
  box-sizing: border-box;
  padding: 3px 10px;

  height: ${props => props.theme.height}px; // control-size
  font-size: ${props => props.theme.fontSize}px; // control-size

  &:last-child {
    border-bottom: none;
  }

  &:nth-child(even) {
    background-color: #dfe3e6;
  }

  &:nth-child(odd) {
    background-color: #ffffff;
  }

`;

const HeaderRow = styled(Row)`
  position: sticky;
  top: 0;
  border-top: 1px solid #dfe3e6;
  z-index: 10;


  .bx--checkbox-label {
    font-size: inherit
  }

  .bx--checkbox-label::before {
    height: 1.125em;
    width: 1.125em;
  }

  ${props => props.error && css`
    label {
      color: #E0182D;
    }
  `}

  .bx--checkbox-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bx--form-item.bx--checkbox-wrapper:first-of-type {
    margin-top: 0;
  }

`;

const FieldCheckbox = styled(Checkbox)`
  font-weight: 600;
  line-height: 1.07;
  text-align: left;
  color: #152935;
`;

const IdfObjectItem = ({
  isSelected,
  toggleSelect,
  orderNumber,
  id,
  fields,
  maxObjectsLength,
  fieldInfoArray,
  onChange,
  references,
  extensions,
}) => {
  const [invalidObjects, setInvalidObjects] = useState([]);

  let emptyArray = [];
  if (fields.length < maxObjectsLength) {
    emptyArray = new Array(maxObjectsLength - fields.length).map((value, index) => (
      <Row key={index}></Row>
    ));
  }

  function onValidateObjectInput(objectId, isValid) {
    const elementIndex = invalidObjects.indexOf(objectId);
    if (isValid && elementIndex !== -1) {
      invalidObjects.splice(elementIndex, 1);
      setInvalidObjects([...invalidObjects]);
    } else if (!isValid && elementIndex === -1) {
      setInvalidObjects([...invalidObjects, objectId]);
    }
  }

  const normalFields = [];
  const extensibleFields = [];
  _.forEach(fieldInfoArray, field => {
    const extensibleName = field.options['extensible'];
    if (extensibleName) {
      extensibleFields.push(field);
    } else {
      normalFields.push(field);
    }
  });

  const extensibleLength = extensions && Object.values(extensions).length > 0 && Object.values(extensions)[0].length;
  const extensibleFieldGroups = _.range(extensibleLength).map(extensibleIndex => {
    return extensibleFields.map(field => {
      const extensibleName = field.options['extensible'];
      const value = extensions[extensibleName][extensibleIndex][field.idd_name];
      return {
        ...field,
        value,
        extensibleName
      };
    });
  });

  return (
    <Container>
      <HeaderRow
        onClick={() => {
          toggleSelect();
        }}
        error={invalidObjects.length > 0}
      >
        <FieldCheckbox
          id={`${id}`}
          checked={isSelected}
          labelText={`Object ${orderNumber} (#${id})`}
          onChange={toggleSelect}
        />
      </HeaderRow>

      {normalFields.map(field => (
        <Row key={field.field_id}>
          <IdfObjectInput
            field={field}
            value={fields[field.idd_name]}
            onChange={resValue => {
              onChange(field.idd_name, resValue);
            }}
            onValidateObject={onValidateObjectInput}
            references={references}
          />
        </Row>
      ))}

      {extensibleFieldGroups.map((fields, extensibleIndex) => {
        return fields.map(field => {
          return (
            <Row key={`${field.field_id}-extensible-${extensibleIndex}`}>
              <IdfObjectInput
                field={field}
                value={field.value}
                isExtensibleInput
                onChange={resValue => {
                  onChange(field.idd_name, resValue, field.extensibleName, extensibleIndex);
                }}
                onValidateObject={onValidateObjectInput}
                references={references}
              />
            </Row>
          )
        })
      })}

      { fields.length < maxObjectsLength && emptyArray }
    </Container>
  )
}

export default IdfObjectItem;
