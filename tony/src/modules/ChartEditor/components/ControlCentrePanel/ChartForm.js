import React from 'react';
import styled from 'styled-components';
import {
  Select,
  DatePicker,
  DatePickerInput,
  Button,
  SelectItem,
  NumberInput,
  TextInput
} from 'carbon-components-react';
import _ from 'lodash';
import moment from 'moment';
import {
  CHART_FORM_STEPS,
  BAR_CHART_TYPES,
  PIE_CHART_TYPES
} from '../../reducers/chartForm';

const FormContainer = styled.div`
  margin-top: 15px;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-grow: 1;
`;

const StepSelect = styled(Select)`
  &.bx--select {
    width: 100px;
  }
`;

const MaxiumDataPointSelect = styled(Select)`
  &.bx--select {
    width: 200px;
  }
`;

const ChartTypeSelect = styled(Select)`
  &.bx--select {
    width: 135px;
  }
`;

const DateTimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
`;

const DateTimeInput = styled(TextInput)`
  min-width: 50px;
  padding: 0 10px;
`;

const maximumDataPoints = [10000];

const ChartForm = ({
  chart,
  formValues,
  setValue,
  submitForm,
  clearForm,
  sectionLength,
  setSectionLength,
  plottedType,
  setPlottedType
}) => {
  return (
    <FormContainer>
      <FormRow>
        {chart.type === 'bar' && (
          <ChartTypeSelect
            id="chart-editor-chart-type-dropdown"
            labelText="Type"
            defaultValue="range"
            value={plottedType}
            onChange={e => setPlottedType(e.target.value)}
          >
            {BAR_CHART_TYPES.map(({ label, value }) => (
              <SelectItem key={label} value={value} text={label} />
            ))}
          </ChartTypeSelect>
        )}

        {chart.type === 'pie' && (
          <ChartTypeSelect
            id="chart-editor-chart-type-dropdown"
            labelText="Type"
            defaultValue="range"
            value={plottedType}
            onChange={e => setPlottedType(e.target.value)}
          >
            {PIE_CHART_TYPES.map(({ label, value }) => (
              <SelectItem key={label} value={value} text={label} />
            ))}
          </ChartTypeSelect>
        )}

        {((chart.type === 'pie' && plottedType === 'single') ||
          chart.type === 'radar') && (
          <DateTimeContainer>
            <DateTimeInput
              type="number"
              id="month-input"
              labelText="Month"
              onChange={e => setValue('month', e.target.value)}
            />
            <DateTimeInput
              type="number"
              id="month-input"
              labelText="Date"
              onChange={e => setValue('date', e.target.value)}
            />
            <DateTimeInput
              type="number"
              id="month-input"
              labelText="Hour"
              onChange={e => setValue('hour', e.target.value)}
            />
            <DateTimeInput
              type="number"
              id="month-input"
              labelText="Minute"
              onChange={e => setValue('minute', e.target.value)}
            />
          </DateTimeContainer>
        )}

        {plottedType === 'single' && chart.type !== 'pie' && (
          <>
            <DatePicker
              id="chart-range"
              datePickerType="range"
              dateFormat="d/m/Y"
              onChange={dates => {
                setValue('startDate', dates[0]);
                if (dates.length > 1) setValue('endDate', dates[1]);
              }}
            >
              <DatePickerInput
                id="chart-range-start"
                labelText="Start"
                value={
                  formValues.startDate
                    ? moment(formValues.startDate).format('DD/MM/YYYY')
                    : ''
                }
              />
              <DatePickerInput
                id="chart-range-end"
                labelText="End"
                value={
                  formValues.endDate
                    ? moment(formValues.endDate).format('DD/MM/YYYY')
                    : ''
                }
              />
            </DatePicker>
          </>
        )}

        {chart.type === 'line' && (
          <StepSelect
            id="chart-editor-select-steps"
            labelText="Steps"
            defaultValue="daily"
            value={formValues.steps}
            onChange={e => setValue('steps', e.target.value)}
          >
            {CHART_FORM_STEPS.map(step => (
              <SelectItem key={step} value={step} text={_.upperFirst(step)} />
            ))}
          </StepSelect>
        )}
      </FormRow>

      <FormRow>
        {plottedType === 'single' && chart.type === 'line' && (
          <MaxiumDataPointSelect
            id="chart-editor-select-maximum-data-points"
            labelText="Мax Number of Data Points"
            defaultValue={maximumDataPoints[0]}
            value={formValues.maximumDataPoints}
            onChange={value => setValue('maximumDataPoints', value)}
          >
            {maximumDataPoints.map(point => (
              <SelectItem key={point} value={point} text={point} />
            ))}
          </MaxiumDataPointSelect>
        )}

        {plottedType === 'group' && chart.type !== 'radar' && (
          <NumberInput
            id="section-number"
            label="Sections"
            value={sectionLength || 4}
            onChange={e => setSectionLength(Number(e.target.value))}
          />
        )}

        {chart.type === 'radar' && (
          <Button
            kind="secondary"
          >
            Add Simulation
          </Button>
        )}

        <ButtonContainer>
          <Button
            kind="secondary"
            style={{ marginRight: 5 }}
            onClick={submitForm}
          >
            Apply
          </Button>
          <Button kind="secondary" onClick={clearForm}>
            Reset
          </Button>
        </ButtonContainer>
      </FormRow>
    </FormContainer>
  );
};

export default ChartForm;
