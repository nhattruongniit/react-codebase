import * as api from '../services/api';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';

export default async function fetchValuesForSingleChart(getState) {
  const { variableValues, variables } = await prepareChartVariables(getState);
  const chartData = organizeChartData(variables, variableValues, getState);
  return chartData;
}

async function prepareChartVariables(getState) {
  const {
    startDate,
    endDate,
  } = getState().chartEditor.chartForm.values;

  const variables = getSelectedVariables(getState);

  const pms = variables.map(variable =>
    api.getVariableValues(
      variable.simulation_id,
      variable.id,
      startDate,
      endDate
    )
  );

  const results = await Promise.all(pms);
  const variableValues = results.map(res => res.data.data);

  return {
    variables,
    variableValues,
  };
}

export function organizeChartData(variables, variableValues) {
  if (variableValues.length === 0 || variableValues[0].length === 0) {
    throw new Error('Invalid variable values');
  }

  const chartValues = [];
  const variableType = variables[0].type;

  let minDate = new Date();
  let maxDate = new Date(1900, 1, 1);

  variableValues.forEach(values => {
    values.forEach(value => {
      const date = new Date(value.datetime);
      if (date < minDate) minDate = date;
      if (date > maxDate) maxDate = date;
    });
  });

  let currentDateTime = new Date(minDate.getTime());
  let variableValueIndex = 0;
  let loopIndex = 1;

  const periodInfo = getChartPeriodInfo(variableType);

  while (currentDateTime < maxDate) {
    const resultItem = {
      name: periodInfo.label + ' ' + loopIndex,
      chartData: []
    };
    let periodDateTime = new Date(currentDateTime.getTime());
    let periodIndex = 0;
    while (
      periodInfo.periodLoopingCondition(periodDateTime) === true || periodIndex === 0
    ) {
      const periodChartData = {
        name: moment(periodDateTime).format(periodInfo.dateFormat)
      };
      variables.forEach((variable, variableIndex) => {
        const value = variableValues[variableIndex][variableValueIndex].value;
        periodChartData[variable.full_name] = Number(value);
      });
      variableValueIndex++;
      periodDateTime = moment(periodDateTime)
        .add(periodInfo.dateIncreaseValue, periodInfo.dateIncreaseType)
        .toDate();
      periodIndex++;
      resultItem.chartData.push(periodChartData);
      currentDateTime = new Date(periodDateTime.getTime());
    }
    chartValues.push(resultItem);
    loopIndex++;
  }

  const labels = {};
  variables.forEach(variable => {
    labels[variable.full_name] = variable.color;
  });

  return {
    labels,
    chartValues,
  }
}

function getChartPeriodInfo(type) {
  switch (type) {
    case 'runperiod':
    case 'timestep':
    case 'hourly': {
      return {
        label: 'Day',
        dateFormat: 'HH:ss',
        dateIncreaseValue: 1,
        dateIncreaseType: 'hour',
        periodLoopingCondition: (currentDateTime) => moment(currentDateTime).hour() !== 0,
      }
    }

    case 'daily': {
      return {
        label: 'Week',
        dateFormat: 'ddd DD MMM',
        dateIncreaseValue: 1,
        dateIncreaseType: 'day',
        periodLoopingCondition: (currentDateTime) => {
          return moment(currentDateTime).weekday() !== 1;
        }
      }
    }

    case 'monthly': {
      return {
        label: 'Year',
        dateFormat: 'MMM',
        dateIncreaseValue: 1,
        dateIncreaseType: 'month',
        periodLoopingCondition: (currentDateTime) => moment(currentDateTime).dayOfYear() !== 1,
      }
    }
  }
}

export function getSelectedVariables(getState) {
  const {
    variables,
    selectedVariables
  } = getState().chartEditor.plottedVariables;

  const result = Object.keys(selectedVariables)
    .filter(variableId => {
      return variableId && selectedVariables[variableId] === true;
    })
    .map(variableId => {
      const variable = variables.find(
        variable => String(variable.id) === variableId
      );
      return cloneDeep(variable);
    });
  return result;
}