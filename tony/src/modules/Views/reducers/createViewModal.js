import * as viewApi from '../services/viewsApi';
import history from 'config/history';

import { FETCH_VIEWS_SUCCESS } from './views';

const FETCH_SIMULATORS_START = 'VIEWS/FETCH_SIMULATORS_START';
const FETCH_SIMULATORS_SUCCESS = 'VIEWS/FETCH_SIMULATORS_SUCCESS';
const FETCH_SIMULATORS_ERROR = 'VIEWS/FETCH_SIMULATORS_ERROR';

const FETCH_CHARTS_START = 'VIEWS/FETCH_CHARTS_START';
const FETCH_CHARTS_SUCCESS = 'VIEWS/FETCH_CHARTS_SUCCESS';
const FETCH_CHARTS_ERROR = 'VIEWS/FETCH_CHARTS_ERROR';

export const SET_MODAL_VISIBILITY =
  'VIEWS/VIEW_DASHBOARD/CREATE_VIEW_MODAL_VISIBILITY';

const ADD_CHARTS_START = 'VIEWS/ADD_CHARTS_START';
const ADD_CHARTS_ERROR = 'VIEWS/ADD_CHARTS_ERROR';

const SELECT_CHART_SUCCESS = 'VIEWS/SELECT_CHART_SUCCESS';
const UNSELECT_CHART_SUCCESS = 'VIEWS/UNSELECT_CHART_SUCCESS';

const SET_TREE_VIEW_DATA = 'VIEWS/CREATE_VIEW_MODAL/SET_TREE_VIEW_DATA';
const SET_TREE_VIEW_ITEM = 'VIEWS/CREATE_VIEW_MODAL/SET_TREE_VIEW_ITEM';
const ADD_TREE_VIEW_ITEM = 'VIEWS/CREATE_VIEW_MODAL/ADD_TREE_VIEW_ITEM';

export const setModalVisibility = isShowing => (dispatch, getState) => {
  const documents = getState().projects.documents.documentItems;
  const treeData = {};

  documents.forEach(document => {
    const key = 'document-' + document.id;
    const item = {
      key,
      id: document.id,
      type: 'document',
      root: true,
      label: document.document_name,
      items: [],
      canExpand: true,
      pagination: {
        isEmpty: false,
        page: 0,
        loadMore: false,
      },
    };
    treeData[key] = item;
  });

  dispatch({
    type: SET_TREE_VIEW_DATA,
    payload: treeData
  });

  dispatch({
    type: SET_MODAL_VISIBILITY,
    payload: { isShowing }
  });
};

export const fetchTreeViewData = treeViewItem => async (dispatch, getState) => {
  const { id, type, key } = treeViewItem;
  const additionTreeData = {};
  const parent = getState().views.createViewModal.treeViewData[key];
  const childrenKeys = [];
  const perPage = 20;
  let res = null;

  if (type === 'document') {
    res = await viewApi.getSimulatorsByDocumentId(
      id,
      parent.pagination.page + 1,
      perPage
    );
    res.data.data.forEach(simulation => {
      const key = 'simulation-' + simulation.id;
      const treeItem = {
        key,
        id: simulation.id,
        type: 'simulation',
        label: simulation.simulation_name,
        canExpand: true,
        items: [],
        isEmpty: false,
        pagination: {
          isEmpty: false,
          page: 0,
          loadMore: false
        }
      };
      childrenKeys.push(key);
      additionTreeData[key] = treeItem;
    });
  }

  if (type === 'simulation') {
    res = await viewApi.getChartsBySimulatorId(
      id,
      parent.pagination.page + 1,
      perPage
    );
    res.data.data.forEach(chart => {
      const key = 'chart-' + chart.id;
      const treeItem = {
        key,
        id: chart.id,
        type: 'chart',
        label: chart.chart_name,
        canExpand: false
      };
      childrenKeys.push(key);
      additionTreeData[key] = treeItem;
    });
  }

  parent.pagination.page++;
  parent.items = parent.items.concat(childrenKeys);

  if (res.data.meta.current_page < res.data.meta.last_page) {
    parent.pagination.loadMore = true;
  } else {
    parent.pagination.loadMore = false;
  }

  if (res.data.data.length === 0) {
    parent.pagination.isEmpty = true;
  }

  dispatch({
    type: ADD_TREE_VIEW_ITEM,
    payload: additionTreeData
  });

  dispatch({
    type: SET_TREE_VIEW_ITEM,
    payload: {
      key,
      item: parent
    }
  });
};

export const fetchSimulatorsByDocument = documentId => async dispatch => {
  dispatch({ type: FETCH_SIMULATORS_START });
  try {
    const res = await viewApi.getSimulatorsByDocumentId(documentId);
    const simulators = res.data.data;
    simulators.sort((d1, d2) => {
      return new Date(d2.updated_at) - new Date(d1.updated_at);
    });
    dispatch({
      type: FETCH_SIMULATORS_SUCCESS,
      payload: { simulators }
    });
  } catch (e) {
    dispatch({
      type: FETCH_SIMULATORS_ERROR
    });
  }
};

export const fetchChartsBySim = simId => async dispatch => {
  dispatch({ type: FETCH_CHARTS_START });
  try {
    const res = await viewApi.getChartsBySimulatorId(simId);
    const charts = res.data.data;
    charts.sort((d1, d2) => {
      return new Date(d2.updated_at) - new Date(d1.updated_at);
    });
    dispatch({
      type: FETCH_CHARTS_SUCCESS,
      payload: { charts }
    });
  } catch (e) {
    dispatch({
      type: FETCH_CHARTS_ERROR
    });
  }
};

export const addChartsToView = (
  viewName,
  projectId,
  charts
) => async dispatch => {
  // dispatch({ type: ADD_CHARTS_START });
  try {
    const response = await viewApi.createView(viewName, projectId);
    const viewId = response.data.data.id;
    // const view = response.data.data;
    await viewApi.addChartsToView(viewId, charts);
    // dispatch({
    //   type: FETCH_VIEWS_SUCCESS,
    //   payload: { 
    //     viewItems: {
    //       data: [view],
    //       meta: {
    //         currentPage: 1,
    //         perPage: 10,
    //         totalItems: 20,
    //       }
    //     } 
    //   }
    // });
    const link = `/dashboard/${projectId}/views/${viewId}/charts`;
    history.push(link);
    dispatch(setModalVisibility(false));
  } catch (e) {
    dispatch({ type: ADD_CHARTS_ERROR });
  }
};

export const selectChart = (isCheck, id) => async dispatch => {
  dispatch({ type: SELECT_CHART_SUCCESS, payload: { isCheck, id } });
};

export const deleteselectChart = () => async dispatch => {
  dispatch({ type: UNSELECT_CHART_SUCCESS });
};

// export const emptyselectChart = () => async

export default function reducer(
  state = {
    isShowing: false,
    isWorking: false,
    error: null,
    simulators: [],
    charts: [],
    selectCharts: [],
    treeViewData: {}
  },
  action
) {
  switch (action.type) {
    case SET_MODAL_VISIBILITY: {
      return {
        ...state,
        isShowing: action.payload.isShowing
      };
    }

    case FETCH_SIMULATORS_SUCCESS: {
      return {
        ...state,
        simulators: [...state.simulators, ...action.payload.simulators]
      };
    }

    case FETCH_SIMULATORS_ERROR: {
      return {
        ...state,
        simulators: [],
        error: true
      };
    }

    case FETCH_CHARTS_SUCCESS: {
      return {
        ...state,
        charts: [...state.charts, ...action.payload.charts]
      };
    }

    case FETCH_CHARTS_ERROR: {
      return {
        ...state,
        charts: [],
        error: true
      };
    }

    case SELECT_CHART_SUCCESS: {
      let newArray = [];
      if (action.payload.isCheck) {
        newArray = [...state.selectCharts, action.payload.id];
      } else {
        newArray = state.selectCharts.filter(
          chart => chart !== action.payload.id
        );
      }
      return {
        ...state,
        selectCharts: newArray
      };
    }

    case UNSELECT_CHART_SUCCESS: {
      return {
        ...state,
        selectCharts: []
      };
    }

    case SET_TREE_VIEW_DATA: {
      return {
        ...state,
        treeViewData: action.payload
      };
    }

    case SET_TREE_VIEW_ITEM: {
      const { key, item } = action.payload;
      return {
        ...state,
        treeViewData: {
          ...state.treeViewData,
          [key]: item
        }
      };
    }

    case ADD_TREE_VIEW_ITEM: {
      return {
        ...state,
        treeViewData: {
          ...state.treeViewData,
          ...action.payload
        }
      };
    }

    default: {
      return state;
    }
  }
}
