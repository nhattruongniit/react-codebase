import * as chartsApi from '../services/chartsApi';
import * as viewApi from '../../Views/services/viewsApi';

import { FETCH_CHARTS_BY_VIEW_SUCCESS } from './charts';

export const SET_MODAL_VISIBILITY = 'CHARTS/SET_MODAL_VISIBILITY';
export const SET_TOOLTIP_VISIBILITY = 'CHARTS/SET_TOOLTIP_VISIBILITY';

const ADD_CHARTS_ERROR = 'CHARTS/ADD_CHARTS_ERROR';

const SELECT_CHART_SUCCESS = 'CHARTS/SELECT_CHART_SUCCESS';
const UNSELECT_CHART_SUCCESS = 'CHARTS/UNSELECT_CHART_SUCCESS';

const SET_TREE_VIEW_DATA = 'CHARTS/CREATE_CHART_MODAL/SET_TREE_VIEW_DATA';
const SET_TREE_VIEW_ITEM = 'CHARTS/CREATE_CHART_MODAL/SET_TREE_VIEW_ITEM';
const ADD_TREE_VIEW_ITEM = 'CHARTS/CREATE_CHART_MODAL/ADD_TREE_VIEW_ITEM';

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

export const setTooltipVisibility = isShowTooltip => ({ 
  type: SET_TOOLTIP_VISIBILITY, 
  payload: { isShowTooltip } 
});

export const allowAddChart = () => async (dispatch, getState) => {
  dispatch(setTooltipVisibility(false));
  const { chartItems } = getState().charts.charts;
  if (chartItems.length >= 12) {
    dispatch(setTooltipVisibility(true));
  } else {
    dispatch(setModalVisibility(true));
  }
}

export const addChartsToView = (viewId, chartIds, chartCloned, chartOwner) => async (dispatch, getState) => {
  const charts = getState().views.createViewModal.charts;
  try {
    const response = await chartsApi.addChartsToView(viewId, chartIds);
    const results = response.data.added;
    const isExsitChart = charts.filter(obj => results.indexOf(obj.id) !== -1);
    dispatch(setModalVisibility(false));
    if(isExsitChart.length > 0) {
      dispatch({
        type: FETCH_CHARTS_BY_VIEW_SUCCESS,
        payload: { chartItems: isExsitChart },
      });
    } else if (chartCloned && chartCloned.length > 0) {
      dispatch({
        type: FETCH_CHARTS_BY_VIEW_SUCCESS,
        payload: { chartItems: chartCloned },
      });
    } else if (chartOwner && chartOwner.length > 0) {
      // create new chart
      dispatch({
        type: FETCH_CHARTS_BY_VIEW_SUCCESS,
        payload: { chartItems: chartOwner },
      });
    }
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


export const fetchTreeViewData = treeViewItem => async (dispatch, getState) => {
  const { id, type, key } = treeViewItem;
  const additionTreeData = {};
  const parent = getState().charts.createChartModal.treeViewData[key];
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
        canExpand: false,
        chartOwner: chart 
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

export default function reducer(state = {
  isShowing: false,
  isWorking: false,
  isShowTooltip: false,
  error: null,
  selectCharts: [],
  treeViewData: {},
}, action) {
  switch (action.type) {
    case SET_MODAL_VISIBILITY: {
      return {
        ...state,
        isShowing: action.payload.isShowing,
        isShowTooltip: false,
      };
    }

    case SET_TOOLTIP_VISIBILITY: {
      return {
        ...state,
        isShowing: false,
        isShowTooltip: action.payload.isShowTooltip
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