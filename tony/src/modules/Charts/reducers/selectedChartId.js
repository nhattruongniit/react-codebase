import _ from 'lodash';

const SELECT_CHART = 'CHARTS/SELECTED_CHART_IDS/SELECT_CHART';
const CLEAR_SELECTED_CHARTS = 'CHARTS/SELECTED_CHART_IDS/CLEAR_SELECTED_CHARTS';

export const selectChart = (chartIds, selected) => ({
  type: SELECT_CHART,
  payload: { chartIds, selected },
});

export const selectAllCharts = () => (dispatch, getState) => {
  const { chartItems } = getState().charts.charts;
  const ids = chartItems.map(item => item.id);
  dispatch(selectChart(ids, true));
}

export const toggleSelectAllCharts = () => (dispatch, getState) => {
  const { chartItems } = getState().charts.charts;
  const selectedChartIds = getState().charts.selectedChartIds;

  if (
    selectedChartIds.length === 0 ||
    (selectedChartIds.length > 0 && selectedChartIds.length < chartItems.length)
  ) {
    return dispatch(selectAllCharts());
  }

  if (selectedChartIds.length === chartItems.length) {
    return dispatch(clearSelectedCharts());
  }
}

export const toggleSelectChart = (id) => (dispatch, getState) => {
  const selectedChartIds = getState().charts.selectedChartIds;
  const index = selectedChartIds.indexOf(id);
  if (index === -1) {
    dispatch(selectChart([id], true));
  } else {
    dispatch(selectChart([id], false));
  }
}

export const clearSelectedCharts = () => ({
  type: CLEAR_SELECTED_CHARTS,
});

export default function reducer(state = [], action) {
  switch (action.type) {
    case SELECT_CHART: {
      const { chartIds, selected } = action.payload;
      if (selected) {
        return _.union(state, chartIds);
      } else {
        return state.filter(id => chartIds.indexOf(id) === -1);
      }
    }

    case CLEAR_SELECTED_CHARTS: {
      return [];
    }

    default:
      return state;
  }
}