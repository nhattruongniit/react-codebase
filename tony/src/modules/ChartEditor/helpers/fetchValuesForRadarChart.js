import * as api from '../services/api';
import { getSelectedVariables } from './fetchValuesForSingleChart';

export default function fetchValuesForRadarChart(getState) {
  const { sections } = getState().chartEditor.plottedVariableSections;
  const availableVariables = getSelectedVariables(getState);

  const pms = availableVariables.map(variable =>
    api.getVariableValues(
      variable.simulation_id,
      variable.id,
    )
  );

  const promiseResults = await Promise.all(pms);
  const variableValuesArray = promiseResults.map(res => res.data.data);
  availableVariables.forEach((variable, variableIndex) => {
    variable.variableValues = variableValuesArray[variableIndex];
  });


  const chartData = [];
  const labels = {};
  sections
    .map((section) => {
      const variables = section.variableIds.map(variableId =>
        availableVariables.find(variable => variable.id === variableId)
      );
      return {
        ...section,
        variables
      };
    })
    .filter(section => section.variables.length > 0)
    .forEach((section, sectionIndex) => {
      const label = `Simulation ${sectionIndex + 1}`;
      labels[label] = section.color;
      section.variables.forEach(variable => {
        const name = variable.name;
        const variableValue = findMatchingVariableValue(
          section,
          variable.variableValues
        );
        if (variableValue) {
          const arrayItem = chartData.find(item => item.subject === name);
          if (!arrayItem) {
            chartData.push({
              subject: name,
              [label]: variableValue.value,
            })
          } else {
            arrayItem[label] = variableValue.value;
          }
        }
      });
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