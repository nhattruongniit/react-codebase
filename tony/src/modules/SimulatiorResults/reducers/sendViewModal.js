import * as viewsApi from '../../Views/services/viewsApi';
import * as chartsApi from '../../Charts/services/chartsApi';
import history from '../../../config/history';

const SET_MODAL_VISIBILITY = 'SIMULATOR_RESULTS/SEND_VIEW_MODAL/SET_MODAL_VISIBILITY';
const CLOSE_MODAL = 'SIMULATOR_RESULTS/SEND_VIEW_MODAL/CLOSE_MODAL';
const GET_ALL_CHARTS_BY_VIEW = 'SIMULATOR_RESULTS/SEND_VIEW_MODAL/GET_ALL_CHARTS_BY_VIEW';

export const setModalSendView = (isShowing, chartIds) =>  async dispatch => {
  try {
    const res = await viewsApi.getAllViews();
    const views = res.data.data;
    dispatch({
      type: SET_MODAL_VISIBILITY,
      payload: { 
        isShowing,
        chartIds,
        views
      },
    })
  } catch (err) {
    console.log('===error setModalSendView===', err)
  }
}

export const closeModalSendView = () => async dispatch => {
  dispatch({ type: CLOSE_MODAL });
}

export const getAllChartsByView = view_id => async dispatch => {
  try {
    const res =  await chartsApi.getChartsByView(view_id);
    const amountChartInView = res.data.data.length;
    dispatch({ 
      type: GET_ALL_CHARTS_BY_VIEW, 
      payload: { amountChartInView } 
    });
  } catch (err) {
    console.log('===error getAllChartsByView===', err)
  }
}

export const addChartToView = (viewId, chartIds) => async (dispatch, getState) => {
  try {
    const projectId = getState().project.id;
    const res = await chartsApi.addChartsToView(viewId, chartIds);
    const data = res.data.added;
    if (data.length > 0) {
      history.push(`/dashboard/${projectId}/views/${viewId}/charts`)
    }
  } catch (err) {
    console.log('===addChartToView==', err)
  }
}

export default function reducer(state = {
  isShowing: false,
  chartIds: [],
  views: [],
  amountChartInView: null,
}, action) {
  switch (action.type) {
    case CLOSE_MODAL: {
      return {
        ...state,
        isShowing: false,
        chartIds: [],
        views: [],
      };
    }
    case SET_MODAL_VISIBILITY: {
      return {
        ...state,
        isShowing: action.payload.isShowing,
        chartIds: action.payload.chartIds,
        views: action.payload.views
      };
    }
    case GET_ALL_CHARTS_BY_VIEW: {
      return {
        ...state,
        amountChartInView: action.payload.amountChartInView,
      };
    }
    default: {
      return state;
    }
  }
}