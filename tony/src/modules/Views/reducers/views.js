import * as viewsApi from '../services/viewsApi';
import { clearSelectedViews } from './selectedViewId';
import { SORT_DIRECTION } from 'appConstants';
import { setModalVisibility } from './createViewModal';

const SET_FILTER_KEYWORD = 'VIEWS/VIEWS/SET_FILTER_KEYWORD';
const FETCH_VIEWS_START = 'VIEWS/VIEWS/FETCH_VIEWS_START';
export const FETCH_VIEWS_SUCCESS = 'VIEWS/VIEWS/FETCH_VIEWS_SUCCESS';
const FETCH_VIEWS_ERROR = 'VIEWS/VIEWS/FETCH_VIEWS_ERROR';
const UPDATE_VIEW_ITEM = 'VIEWS/VIEWS/UPDATE_VIEW_ITEM';
const ADD_VIEW_ITEMS = 'VIEWS/VIEWS/ADD_VIEW_ITEMS';
const REMOVE_VIEW_ITEMS = 'VIEWS/VIEWS/REMOVE_VIEW_ITEMS';
const REQUEST_DELETE_VIEW = 'VIEWS/VIEWS/REQUEST_DELETE_VIEW';
const CANCEL_DELETE_VIEW = 'VIEWS/VIEWS/CANCEL_DELETE_VIEW';

export const requestDeleteSelectedViews = () => ({
  type: REQUEST_DELETE_VIEW,
  payload: {
    isDeleting: true,
    deleteSelectedView: true,
  },
});

export const requestDeleteView = viewId => ({
  type: REQUEST_DELETE_VIEW,
  payload: {
    isDeleting: true,
    viewId,
  },
});

export const confirmDeleteView = () => (dispatch, getState) => {
  const { deleteView: data } = getState().views.views;

  if (!data || !data.isDeleting) {
    return;
  }

  dispatch(cancelDeleteView());

  if (data.viewId) return dispatch(deleteView(data.viewId));
  if (data.deleteSelectedView) return dispatch(deleteSelectedViews());
}

export const cancelDeleteView = () => ({
  type: REQUEST_DELETE_VIEW,
  payload: false,
});

export const addViewItems = viewItems => ({
  type: ADD_VIEW_ITEMS,
  payload: { viewItems },
});

export const setFilterKeyword = filterKeyword => ({
  type: SET_FILTER_KEYWORD,
  payload: { filterKeyword },
});

export const setViewName = (viewId, name) => async (dispatch) => {
  try {
    const res = await viewsApi.updateView(viewId, { view_name: name });
    const updatedView = res.data.data;
    dispatch(updateViewItem(viewId, {
      ...updatedView,
    }));
  } catch (e) {
    console.log('Unable to update view', e);
  }
}

export const deleteSelectedViews = () => async (dispatch, getState) => {
  const selectedViewIds = getState().views.selectedViewIds;
  await viewsApi.deleteViews(selectedViewIds);
  dispatch(clearSelectedViews());
  dispatch({
    type: REMOVE_VIEW_ITEMS,
    payload: { viewIds: selectedViewIds },
  });

}

export const deleteView = viewId => async dispatch => {
  dispatch(clearSelectedViews());
  dispatch({
    type: REMOVE_VIEW_ITEMS,
    payload: { viewIds: [viewId] },
  });
  await viewsApi.deleteViews([viewId]);
}

export const getAllViewsByProjectId = (projectId, currentPage, perPage) => async (dispatch) => {
  // dispatch({ type: FETCH_VIEWS_START });
  dispatch(clearSelectedViews());
  dispatch(setModalVisibility(false));
  dispatch(cancelDeleteView());
  dispatch(setFilterKeyword(''))
  try {
    const res = await viewsApi.getAllViewsByProjectId(projectId, currentPage, perPage);
    const VIEWS = res.data;
    dispatch({
      type: FETCH_VIEWS_SUCCESS,
      payload: { viewItems: VIEWS },
    });
  } catch (e) {
    dispatch({ type: FETCH_VIEWS_ERROR });
  }
}

export const updateViewItem = (viewId, updateData) => ({
  type: UPDATE_VIEW_ITEM,
  payload: { viewId, updateData },
});

export const duplicateView = viewId =>  async (dispatch, getState) => {
  const projectId = getState().project.id;
  const currentPage = getState().views.views.meta.currentPage;
  const perPage = getState().views.views.meta.perPage;
  try {
    await viewsApi.duplicateView(viewId);
    dispatch(getAllViewsByProjectId(projectId, currentPage, perPage));
  } catch (e) {
    dispatch({ type: FETCH_VIEWS_ERROR });
  }
}

export default function reducer(state = {
  viewItems: [],
  sortDirection: SORT_DIRECTION.ASC,
  deleteView: {},
  meta: {
    currentPage: 1,
    perPage: 10,
    totalItems: 20,
  }
}, action) {
  switch (action.type) {
    case FETCH_VIEWS_START: {
      return {
        ...state,
        viewItems: []
      };
    }

    case FETCH_VIEWS_SUCCESS: {
      return {
        ...state,
        // viewItems: [...state.viewItems, ...action.payload.viewItems.data],
        viewItems: action.payload.viewItems.data,
        meta: {
          currentPage: action.payload.viewItems.meta.current_page,
          perPage: Number(action.payload.viewItems.meta.per_page),
          totalItems: action.payload.viewItems.meta.total,
        }
      };
    }

    case SET_FILTER_KEYWORD: {
      return {
        ...state,
        filterKeyword: action.payload.filterKeyword,
      };
    }

    case UPDATE_VIEW_ITEM: {
      const { viewId, updateData } = action.payload;
      return {
        ...state,
        viewItems: state.viewItems.map(item => {
          if (item.id === viewId) {
            return {
              ...item,
              ...updateData,
            };
          }
          return item;
        }),
      }
    }

    case ADD_VIEW_ITEMS: {
      return {
        ...state,
        viewItems: [
          ...action.payload.viewItems,
          ...state.viewItems,
        ],
      };
    }

    case REMOVE_VIEW_ITEMS: {
      return {
        ...state,
        viewItems: state.viewItems.filter(item => action.payload.viewIds.indexOf(item.id) === -1),
      };
    }

    case REQUEST_DELETE_VIEW: {
      return {
        ...state,
        deleteView: action.payload,
      };
    }

    case CANCEL_DELETE_VIEW: {
      return {
        ...state,
        deleteView: {},
      };
    }

    default:
      return state;
  }
}