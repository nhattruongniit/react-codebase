import * as api from '../services/api';
import { getSelectedVariables } from './fetchValuesForSingleChart';
import isNumber from 'lodash/isNumber';

export default async function fetchValuesForGroupChart(getState) {
  const { sections } = getState().chartEditor.plottedVariableSections;
  const availableVariables = getSelectedVariables(getState);

  const pms = availableVariables.map(variable =>
    api.getVariableValues(variable.simulation_id, variable.id)
  );

  const promiseResults = await Promise.all(pms);
  const variableValuesArray = promiseResults.map(res => res.data.data);

  availableVariables.forEach((variable, variableIndex) => {
    variable.variableValues = variableValuesArray[variableIndex];
  });

  const chartData = [];
  const labels = {};
  sections
    .map((section, sectionIndex) => {
      const variables = section.variableIds.map(variableId =>
        availableVariables.find(variable => variable.id === variableId)
      );
      return {
        ...section,
        variables
      };
    })
    .filter(section => section.variables.length > 0)
    .forEach(section => {
      const sectionName = section.variables[0]
        ? section.variables[0].full_name
        : '';
      const sectionResult = {
        name: sectionName
      };
      section.variables.forEach(variable => {
        const variableValue = findMatchingVariableValue(
          section,
          variable.variableValues
        );
        sectionResult[variable.full_name] = variableValue
          ? variableValue.value
          : 0;
        labels[variable.full_name] = variable.color;
      });
      chartData.push(sectionResult);
    });

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

function findMatchingVariableValue(section, variableValues) {
  return variableValues.find(variableValue => {
    const { month, date, hour, minute } = section.datetime;
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
