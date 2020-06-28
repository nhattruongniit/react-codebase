import cloneDeep from 'lodash/cloneDeep';
import LZString from 'lz-string';
import * as chartApi from '../../Charts/services/chartsApi';
import { RESTORE_STATE } from './tabs';
import { submitForm } from './chartForm';
import { setPlottedType } from './plottedVariables';

const SET_CHART = 'CHART_EDITOR/CHART/SET_CHART';

export function fetchChart(chartId) {
  return async function(dispatch) {
    const response = await chartApi.fetchSingleChart(chartId);
    const chart = response.data.data;

    dispatch({
      type: SET_CHART,
      payload: chart
    });

    if (chart.type === 'radar') {
      dispatch(setPlottedType('group'));
    }

    try {
      const uncompressOptionString = chart.options;
      const optionString = LZString.decompress(uncompressOptionString);
      const options = JSON.parse(optionString);
      if (isValidChartOptions(options)) {
        dispatch({
          type: RESTORE_STATE,
          payload: options
        });
        dispatch(submitForm());
      }
    } catch (e) {
      console.log(e);
    }
  };
}

function isValidChartOptions(chartOptions) {
  return chartOptions &&
    chartOptions.chartForm &&
    chartOptions.chartValues &&
    chartOptions.tabs &&
    chartOptions.plottedVariables &&
    chartOptions.plottedVariableSections &&
    chartOptions.variables
    ? true
    : false;
}

export function saveChart() {
  return async function(dispatch, getState) {
    const options = cloneDeep(getState().chartEditor);
    delete options.addVariables;
    delete options.removeSimulationResults;
    delete options.chart;
    delete options.chartValues;
    const optionString = LZString.compress(JSON.stringify(options));

    const chartData = cloneDeep(getState().chartEditor.chart);
    const chartId = chartData.id;
    chartData.options = optionString;
    delete chartData.id;
    delete chartData.created_at;
    delete chartData.updated_at;

    await chartApi.updateChart(chartId, chartData);
  };
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_CHART:
      return action.payload;
    default:
      return state;
  }
}
