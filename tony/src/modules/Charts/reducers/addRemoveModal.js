import * as chartsApi from '../services/chartsApi';

import { FETCH_CHARTS_BY_VIEW_SUCCESS } from './charts';

export const SET_MODAL_ADD_REMOVE = 'CHARTS/ADD_REMOVE/SET_MODAL_ADD_REMOVE';

const ADD_CHARTS_ERROR = 'CHARTS/ADD_REMOVE/ADD_CHARTS_ERROR';

const SELECT_CHART_SUCCESS = 'CHARTS/ADD_REMOVE/SELECT_CHART_SUCCESS';
const UNSELECT_CHART_SUCCESS = 'CHARTS/ADD_REMOVE/UNSELECT_CHART_SUCCESS';

export const setModalAddRemove= isShowingResult => ({
  type: SET_MODAL_ADD_REMOVE,
  payload: { isShowingResult },
});

export const addChartsToView = (viewId, chartIds) => async (dispatch, getState) => {
  const charts = getState().views.createViewModal.charts;

  try {
    const response = await chartsApi.addChartsToView(viewId, chartIds);
    const results = response.data.added;
    const chartItems = charts.filter(obj => results.indexOf(obj.id) !== -1);
    dispatch(setModalAddRemove(false));
    dispatch({
      type: FETCH_CHARTS_BY_VIEW_SUCCESS,
      payload: { chartItems },
    });
  } catch (e) {
    dispatch({ type: ADD_CHARTS_ERROR })
  }
}

export const selectChart = (isCheck, id) => async dispatch => {
  dispatch({ type: SELECT_CHART_SUCCESS, payload: { isCheck, id }});
}

export const deleteSelectChart = () => async dispatch => {
  dispatch({ type: UNSELECT_CHART_SUCCESS })
}

export default function reducer(state = {
  isShowingResult: false,
  isWorking: false,
  error: null,
  selectCharts: []
}, action) {
  switch (action.type) {  
    case SET_MODAL_ADD_REMOVE: {
      return {
        ...state,
        isShowingResult: action.payload.isShowingResult,
      };
    }

    case SELECT_CHART_SUCCESS: {
      let newArray = [];
      if (action.payload.isCheck) {
        newArray = [...state.selectCharts, action.payload.id];
      } else {
        newArray = state.selectCharts.filter(chart => chart !== action.payload.id);
      }
      return {
        ...state,
        selectCharts: newArray
      }
    }

    case UNSELECT_CHART_SUCCESS: {
      return {
        ...state,
        selectCharts: [],
      }
    }

    default: {
      return state;
    }
  }
}