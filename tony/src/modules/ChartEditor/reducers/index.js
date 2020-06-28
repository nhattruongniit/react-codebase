import { combineReducers } from 'redux';
import tabs from './tabs';
import variables from './variables';
import addVariables from './addVariables';
import plottedVariables from './plottedVariables';
import chartForm from './chartForm';
import chartValues from './chartValues';
import chart from './chart';
import plottedVariableSections from './plottedVariableSections';
import removeSimulationResults from './removeSimulationResults';

export default combineReducers({
  tabs,
  variables,
  addVariables,
  plottedVariables,
  chartForm,
  chartValues,
  chart,
  plottedVariableSections,
  removeSimulationResults
});
