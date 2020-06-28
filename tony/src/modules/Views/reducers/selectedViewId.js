import _ from 'lodash';

const SELECT_VIEW = 'VIEWS/SELECTED_VIEW_IDS/SELECT_VIEW';
const CLEAR_SELECTED_VIEWS = 'VIEWS/SELECTED_VIEW_IDS/CLEAR_SELECTED_VIEWS';

export const selectView = (viewIds, selected) => ({
  type: SELECT_VIEW,
  payload: { viewIds, selected },
});

export const selectAllViews = () => (dispatch, getState) => {
  const { viewItems } = getState().views.views;
  const ids = viewItems.map(item => item.id);
  dispatch(selectView(ids, true));
}

export const toggleSelectAllViews = () => (dispatch, getState) => {
  const { viewItems } = getState().views.views;
  const selectedViewIds = getState().views.selectedViewIds;

  if (
    selectedViewIds.length === 0 ||
    (selectedViewIds.length > 0 && selectedViewIds.length < viewItems.length)
  ) {
    return dispatch(selectAllViews());
  }

  if (selectedViewIds.length === viewItems.length) {
    return dispatch(clearSelectedViews());
  }
}

export const toggleSelectView = (viewId) => (dispatch, getState) => {
  const selectedViewIds = getState().views.selectedViewIds;
  const index = selectedViewIds.indexOf(viewId);
  if (index === -1) {
    dispatch(selectView([viewId], true));
  } else {
    dispatch(selectView([viewId], false));
  }
}

export const clearSelectedViews = () => ({
  type: CLEAR_SELECTED_VIEWS,
});

export default function reducer(state = [], action) {
  switch (action.type) {
    case SELECT_VIEW: {
      const { viewIds, selected } = action.payload;
      if (selected) {
        return _.union(state, viewIds);
      } else {
        return state.filter(id => viewIds.indexOf(id) === -1);
      }
    }

    case CLEAR_SELECTED_VIEWS: {
      return [];
    }

    default:
      return state;
  }
}