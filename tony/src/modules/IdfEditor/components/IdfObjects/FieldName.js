import React from 'react';
import styled, { css } from 'styled-components';
import _ from 'lodash';

const Container = styled.div`
  margin-right: 10px;
  position: relative;
  z-index: 100;
  display: table;
  border: 1px solid #dfe3e6;
  border-top: none;
`;

const Column = styled.div`
  display: table-cell;
  padding-right: 20px;
  border-top: 1px solid #dfe3e6;
  border-bottom: 1px solid #dfe3e6;
  vertical-align: middle;
  font-weight: bold;
  white-space: nowrap;
`;

const Row = styled.div`
  width: max-content;
  min-width: 100%;
  display: table-row;
  line-height: 3.43;
  text-align: left;
  color: #152935;
  box-sizing: border-box;

  height: ${props => props.theme.height}px; // control-size
  font-size: ${props => props.theme.fontSize}px; // control-size

  &:first-child {
    ${Column} {
      position: sticky;
      top: 0;
      z-index: 100;
      background: white;
    }
  }

  &:nth-child(even) {
    background-color: #dfe3e6;
  }

  &:nth-child(odd) {
    background-color: #ffffff;
  }
`;

const IndexColumn = styled(Column)`
  text-align: right;
  padding-left: 20px;
`;

const NameColumn = styled(Column)`
  min-width: 150px;
  max-width: 250px;
`;

const UnitColumn = styled(Column)`
  max-width: 100px;
`;

const OverflowText = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IsRequiredIcon = styled.span`
  color: #e0182d;
`;

const FieldName = ({ fields, extensibleLength, ex }) => {
  const allFields = [];
  const extensibleFields = [];
  _.forEach(fields, (field, fieldIndex) => {
    const isExtensible = !!field.options['extensible'];
    if (isExtensible) {
      extensibleFields.push(field);
    } else {
      allFields.push(field);
    }
  });

  _.range(extensibleLength).forEach(extensibleIndex => {
    extensibleFields.forEach(field => {
      const field_name = field.field_name.replace('Vertex 1', 'Vertex ' + (extensibleIndex + 1).toString());
      allFields.push({
        ...field,
        field_name,
      });
    });
  });

  return (
    <Container>
      <Row>
        <IndexColumn>&nbsp;</IndexColumn>
        <NameColumn>Field Name</NameColumn>
        <Column>Units</Column>
        <Column>IDD</Column>
      </Row>
      {_.map(allFields, (field, index) => {
        const isRequired = field.options['required-field'] === '1';
        return (
          <Row key={`${field.field_id}-extensible-${index}`}>
            <IndexColumn>
              {isRequired && <IsRequiredIcon>!</IsRequiredIcon>}
              {index + 1}
            </IndexColumn>
            <NameColumn>
              <OverflowText title={field.field_name}>
                {field.field_name}
              </OverflowText>
            </NameColumn>
            <UnitColumn>
              <OverflowText title={field.options.units}>
                {field.options.units}
              </OverflowText>
            </UnitColumn>
            <Column>{field.idd_name}</Column>
          </Row>
        );
      })}
    </Container>
  );
};

export default FieldName;
