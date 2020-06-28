import * as chartsApi from '../services/chartsApi';
import { clearSelectedCharts } from './selectedChartId';
import { addChartsToView, setTooltipVisibility } from './createChartModal';

export const FETCH_CHARTS_BY_VIEW_SUCCESS = 'CHARTS/FETCH_CHARTS_BY_VIEW_SUCCESS';
const FETCH_CHARTS_BY_VIEW_START = 'CHARTS/FETCH_CHARTS_BY_VIEW_START';
const SET_FILTER_KEYWORD = 'CHARTS/SET_FILTER_KEYWORD';
const FETCH_CHARTS_ERROR = 'CHARTS/FETCH_CHARTS_ERROR';
const UPDATE_CHART_ITEM = 'CHARTS/UPDATE_CHART_ITEM';
const ADD_CHART_ITEMS = 'CHARTS/ADD_CHART_ITEMS';
const REMOVE_CHART_ITEMS = 'CHARTS/REMOVE_CHART_ITEMS';
const REQUEST_DELETE_CHART = 'CHARTS/REQUEST_DELETE_CHART';
const CANCEL_DELETE_CHART = 'CHARTS/CANCEL_DELETE_CHART';
const FETCH_SINGLE_VIEW_SUCCESS = 'CHARTS/FETCH_SINGLE_VIEW_SUCCESS';
const SET_MAXIMIZE_CHART = 'CHARTS/SET_MAXIMIZE_CHART';
const CHANGE_DATA_LINE_CHART = 'CHARTS/CHANGE_DATA_LINE_CHART';

export const requestDeleteSelectedCharts = () => ({
  type: REQUEST_DELETE_CHART,
  payload: {
    isDeleting: true,
    deleteSelectedChart: true,
  },
});

export const requestDeleteChart = chartId => ({
  type: REQUEST_DELETE_CHART,
  payload: {
    isDeleting: true,
    chartId,
  },
});

export const setMaximizeChart = (chartId, isMaximize) => ({
    type: SET_MAXIMIZE_CHART,
    payload: { 
      chartId,
      isMaximize,
    }
});

export const changeRenderLineChart = amountLineChart => dispatch => {
  dispatch({
    type: CHANGE_DATA_LINE_CHART,
    payload: { amountLineChart },
  });
}

export const confirmDeleteChart = () => (dispatch, getState) => {
  const { deleteChart: data } = getState().charts.charts;
  const viewId = getState().charts.charts.view.id;

  if (!data || !data.isDeleting) {
    return;
  }
  dispatch(setTooltipVisibility(false));
  dispatch(cancelDeleteChart());

  if (data.chartId) return dispatch(deleteCharts(viewId, data.chartId));
  if (data.deleteSelectedChart) return dispatch(deleteSelectedCharts());
}

export const cancelDeleteChart = () => ({
  type: REQUEST_DELETE_CHART,
  payload: false,
});

export const addChartItems = chartItems => ({
  type: ADD_CHART_ITEMS,
  payload: { chartItems },
});

export const setFilterKeyword = filterKeyword => ({
  type: SET_FILTER_KEYWORD,
  payload: { filterKeyword },
}); 

export const setChartName = (chartId, chartName, parentSimulationId, chartType, chartOption) => async (dispatch) => {
  const data = {
    "id": chartId,
    "chart_name": chartName,
    "parent_simulation_id": parentSimulationId,
    "type": chartType,
    "options": chartOption,
  }
  
  try {
    const res = await chartsApi.updateChart(chartId, data);
    const updateChart = res.data.data;
    dispatch(updateChartItem(chartId, {
      ...updateChart,
    }));
  } catch (e) {
    console.log('Unable to update view', e);
  }
}

export const deleteSelectedCharts = () => async (dispatch, getState) => {
  const selectedChartIds = getState().charts.selectedChartIds;
  const viewId = getState().charts.charts.view.id;
  await chartsApi.removeChartsFromView(viewId, selectedChartIds);
  dispatch(clearSelectedCharts());
  dispatch({
    type: REMOVE_CHART_ITEMS,
    payload: { chartIds: selectedChartIds },
  });

}

export const deleteCharts = (viewID, chartIds) => async dispatch => {
  dispatch(clearSelectedCharts());
  dispatch({
    type: REMOVE_CHART_ITEMS,
    payload: { chartIds: [chartIds] },
  });
  await chartsApi.removeChartsFromView(viewID, [chartIds]);
}

export const getChartsByView = id => async (dispatch) => {
  dispatch({ type: FETCH_CHARTS_BY_VIEW_START })
  dispatch(clearSelectedCharts())
  dispatch(setTooltipVisibility(false))
  try {
    const res = await chartsApi.getChartsByView(id);
    const CHARTS = res.data.data;
    dispatch({
      type: FETCH_CHARTS_BY_VIEW_SUCCESS,
      payload: { chartItems: CHARTS },
    });
  } catch (e) {
    dispatch({ type: FETCH_CHARTS_ERROR });
  }
}

export const updateChartItem = (chartId, updateData) => ({
  type: UPDATE_CHART_ITEM,
  payload: { chartId, updateData },
});

export const fetchSingleView = id => async (dispatch) => {
  try {
    const res = await chartsApi.fetchSingleView(id);
    dispatch({
      type: FETCH_SINGLE_VIEW_SUCCESS,
      payload: { view: res.data.data },
    });
  } catch (e) {
    console.log('Unable to update view', e);
  }
}

export const fetchSingleChart = chart_id => async (dispatch) => {
  try {
    await chartsApi.fetchSingleChart(chart_id);
  } catch (e) {
    console.log('Unable to update view', e);
  }
}

export const duplicateChart = chartId => async (dispatch, getState) => {
  const { chartItems } = getState().charts.charts;
  if (chartItems.length >= 12) {
    dispatch(setTooltipVisibility(true));
  } else {
    dispatch(clearSelectedCharts());
    const viewId = getState().charts.charts.view.id;
    const response = await chartsApi.cloneChart(chartId);
    const chartCloned = response.data.data;
    const getChartClonedId = response.data.data.id;
    dispatch(addChartsToView(viewId, [getChartClonedId], [chartCloned]))
  }
}

export const duplicateSelectedChart = () => async (dispatch, getState) => {
  const { 
    charts: { chartItems, view },
    selectedChartIds,
  } = getState().charts;

  if (chartItems.length + selectedChartIds.length >= 12) {
    dispatch(setTooltipVisibility(true));
  } else {
    const viewId = view.id;
    const pms = selectedChartIds.map(id => chartsApi.cloneChart(id));
    dispatch(clearSelectedCharts());
    try {
      const arrayCharts = await Promise.all(pms);
      const chartsItem = [];
      const chartIds = [];
      for(let i = 0; i < arrayCharts.length; i++) {
        chartsItem.push(arrayCharts[i].data.data);
        chartIds.push(arrayCharts[i].data.data.id)
      }
      dispatch(addChartsToView(viewId, chartIds, chartsItem))
    } catch (e) {
      console.log(e);
    }
  }
}


export default function reducer(state = {
  chartItems: [],
  deleteChart: {},
  view: [],
  isMaximize: false,
  chartId: null,
  amountLineChart: 5000
}, action) {
  switch (action.type) {
    case FETCH_CHARTS_BY_VIEW_START: {
      return {
        ...state,
        chartItems: []
      };
    }

    case FETCH_CHARTS_BY_VIEW_SUCCESS: {
      return {
        ...state,
        chartItems: [...state.chartItems, ...action.payload.chartItems]
      };
    }

    case SET_FILTER_KEYWORD: {
      return {
        ...state,
        filterKeyword: action.payload.filterKeyword,
      };
    }

    case UPDATE_CHART_ITEM: {
      const { chartId, updateData } = action.payload;
      return {
        ...state,
        chartItems: state.chartItems.map(item => {
          if (item.id === chartId) {
            return {
              ...item,
              ...updateData,
            };
          }
          return item;
        }),
      }
    }

    case ADD_CHART_ITEMS: {
      return {
        ...state,
        chartItems: [
          ...action.payload.chartItems,
          ...state.chartItems,
        ],
      };
    }

    case REMOVE_CHART_ITEMS: {
      return {
        ...state,
        chartItems: state.chartItems.filter(item => action.payload.chartIds.indexOf(item.id) === -1),
      };
    }

    case REQUEST_DELETE_CHART: {
      return {
        ...state,
        deleteChart: action.payload,
      };
    }

    case CANCEL_DELETE_CHART: {
      return {
        ...state,
        deleteChart: {},
      };
    }

    case FETCH_SINGLE_VIEW_SUCCESS: {
      return {
        ...state,
        view: action.payload.view,
      };
    }

    case SET_MAXIMIZE_CHART: {
      return {
        ...state,
        isMaximize: action.payload.isMaximize,
        chartId: action.payload.chartId
      }
    }

    case CHANGE_DATA_LINE_CHART: {
      return {
        ...state,
        amountLineChart: action.payload.amountLineChart
      }
    }

    default:
      return state;
  }
}