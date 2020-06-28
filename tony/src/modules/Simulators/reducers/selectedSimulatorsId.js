import _ from 'lodash';

const SELECT_ITEM = 'SIMULATORS/SELECT_ITEM';
const CLEAR_SELECTED_ITEMS = 'SIMULATORS/CLEAR_SELECTED_ITEMS';

export const selectItem = (simulatorIds, selected) => ({
  type: SELECT_ITEM,
  payload: { simulatorIds, selected },
});

export const selectAllSimulators = () => (dispatch, getState) => {
  const { simulatorItems } = getState().simulators.simulators;
  const ids = simulatorItems.map(item => item.id);
  dispatch(selectItem(ids, true));
}

export const toggleSelectAllSimulators = () => (dispatch, getState) => {
  const { simulatorItems } = getState().simulators.simulators;
  const selectedSimulatorsId = getState().simulators.selectedSimulatorsId;

  if (
    selectedSimulatorsId.length === 0 ||
    (selectedSimulatorsId.length > 0 && selectedSimulatorsId.length < simulatorItems.length)
  ) {
    return dispatch(selectAllSimulators());
  }

  if (selectedSimulatorsId.length === simulatorItems.length) {
    return dispatch(clearSelectedItems());
  }
}

export const toggleSelectItem = (simulatorId) => (dispatch, getState) => {
  const selectedSimulatorsId = getState().simulators.selectedSimulatorsId;
  const index = selectedSimulatorsId.indexOf(simulatorId);
  if (index === -1) {
    dispatch(selectItem([simulatorId], true));
  } else {
    dispatch(selectItem([simulatorId], false));
  }
}

export const clearSelectedItems = () => ({
  type: CLEAR_SELECTED_ITEMS,
});

export default function reducer(state = [], action) {
  switch (action.type) {
    case SELECT_ITEM: {
      const { simulatorIds, selected } = action.payload;
      if (selected) {
        return _.union(state, simulatorIds);
      } else {
        return state.filter(id => simulatorIds.indexOf(id) === -1);
      }
    }

    case CLEAR_SELECTED_ITEMS: {
      return [];
    }

    default:
      return state;
  }
}