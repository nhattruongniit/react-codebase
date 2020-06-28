import moment from 'moment';
import { LOAD_INITIAL_STATE, RESTORE_STATE } from './tabs';

const SET_CHART_VALUES = 'CHART_EDITOR/CHART_VALUES/SET_CHART_VALUES';
const SET_ACTIVE_PAGE = 'CHART_EDITOR/CHART_VALUES/SET_ACTIVE_PAGE';
const SET_CHART_LABELS = 'CHART_EDITOR/CHART_VALUES/SET_CHART_LABELS';
const CLEAR_CHART_VALUES = 'CHART_EDITOR/CHART_VALUES/CLEAR_CHART_VALUES';

export function clearChartValues() {
  return {
    type: CLEAR_CHART_VALUES,
  }
}

export function setChartValues(chartValues, labels) {
  return function(dispatch) {
    dispatch({
      type: SET_CHART_VALUES,
      payload: {
        chartValues
      }
    });

    dispatch({
      type: SET_ACTIVE_PAGE,
      payload: {
        activePage: 0
      }
    });

    dispatch({
      type: SET_CHART_LABELS,
      payload: { labels }
    });
  };
}

export function setActivePage(activePage) {
  return {
    type: SET_ACTIVE_PAGE,
    payload: {
      activePage
    }
  };
}

const INITIAL_STATE = {
  chartValues: [],
  activePage: 0,
  labels: []
};

export default function reducer(
  state = INITIAL_STATE,
  action
) {
  switch (action.type) {
    case SET_ACTIVE_PAGE: {
      return {
        ...state,
        activePage: action.payload.activePage
      };
    }

    case SET_CHART_VALUES: {
      return {
        ...state,
        chartValues: action.payload.chartValues
      };
    }

    case SET_CHART_LABELS: {
      return {
        ...state,
        labels: action.payload.labels
      };
    }

    case CLEAR_CHART_VALUES: {
      return INITIAL_STATE;
    }

    case LOAD_INITIAL_STATE: {
      return INITIAL_STATE;
    }

    case RESTORE_STATE: {
      if (action.payload.chartValues) return action.payload.chartValues;
      return state;
    }

    default: {
      return state;
    }
  }
}
