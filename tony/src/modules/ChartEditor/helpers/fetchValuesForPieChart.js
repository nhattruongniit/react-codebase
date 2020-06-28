import * as api from '../services/api';
import { toast } from 'react-toastify';
import { getSelectedVariables } from './fetchValuesForSingleChart';
import isNumber from 'lodash/isNumber';

export default async function fetchValuesForPieChart(getState) {
  const { sections } = getState().chartEditor.plottedVariableSections;
  const { plottedType } = getState().chartEditor.plottedVariables;
  const { values } = getState().chartEditor.chartForm;
  const availableVariables = getSelectedVariables(getState);

  const pms = availableVariables.map(variable =>
    api.getVariableValues(variable.simulation_id, variable.id)
  );

  const promiseResults = await Promise.all(pms);
  const variableValuesArray = promiseResults.map(res => res.data.data);
  availableVariables.forEach((variable, variableIndex) => {
    variable.variableValues = variableValuesArray[variableIndex];
  });

  const labels = {};
  let chartData;

  if (plottedType === 'group') {
    chartData = {
      outerData: [],
      innerData: []
    };
    const sectionWithVariables = sections
      .map((section, sectionIndex) => {
        const variables = section.variableIds.map(variableId =>
          availableVariables.find(variable => variable.id === variableId)
        );
        return {
          ...section,
          variables
        };
      })
      .filter(section => section.variables.length > 0);

    sectionWithVariables.forEach(section => {
      const sectionName = section.variables[0] ? section.variables[0].full_name : '';
      let totalValue = 0;
      section.variables.forEach(variable => {
        const variableValue = findMatchingVariableValue(
          section.datetime,
          variable.variableValues
        );
        const value = variableValue ? Number(variableValue.value) : 0;
        totalValue += value;
        chartData.innerData.push({
          name: variable.full_name,
          value
        });
        labels[variable.full_name] = variable.color;
      });
      chartData.outerData.push({
        name: sectionName,
        value: totalValue
      });
      labels[sectionName] = section.color;
    });
  } else {
    chartData = [];
    availableVariables.forEach(variable => {
      const variableValue = findMatchingVariableValue(values, variable.variableValues);
      if (variableValue) {
        chartData.push({
          name: variable.full_name,
          value: Number(variableValue.value),
        });
        labels[variable.full_name] = variable.color;
      }
    });
  }

  const chartValues = [
    {
      chartData
    }
  ];

  return {
    chartValues,
    labels
  };
}

function findMatchingVariableValue(dateTime, variableValues) {
  return variableValues.find(variableValue => {
    const { month, date, hour, minute } = dateTime;
    const variableDate = new Date(variableValue.datetime);
    const matchingDate = new Date(
      variableDate.getFullYear(),
      isNumber(month) ? Number(month) - 1 : variableDate.getMonth(),
      isNumber(date) ? Number(date) - 1 : variableDate.getDate(),
      isNumber(hour) ? Number(hour) - 1 : variableDate.getHours(),
      isNumber(minute) ? Number(minute) - 1 : variableDate.getMinutes(),
      0,
      0
    );
    return variableDate.getTime() === matchingDate.getTime();
  });
}
