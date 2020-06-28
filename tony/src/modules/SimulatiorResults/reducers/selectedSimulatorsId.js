import _ from 'lodash';

const SELECT_ITEM = 'SIMULATION_RESULT/SELECT_ITEM';
const CLEAR_SELECTED_ITEMS = 'SIMULATION_RESULT/CLEAR_SELECTED_ITEMS';

export const selectItem = (simulatorIds, selected) => ({
  type: SELECT_ITEM,
  payload: { simulatorIds, selected },
});

export const selectAllSimulators = () => (dispatch, getState) => {
  const { simulationResults } = getState().simulatorResults.simulationResults;
  let hasIds = [];
  simulationResults.map(item => {
    if(item.id) {
      hasIds.push(item.id)
    };
    return null;
  });
  dispatch(selectItem(hasIds, true));
}

export const toggleSelectAllSimulators = () => (dispatch, getState) => {
  const { simulationResults } = getState().simulatorResults.simulationResults;
  const selectedSimulatorsId = getState().simulatorResults.selectedSimulatorsId;
  let hasIds = [];
  simulationResults.map(item => {
    if(item.id) {
      hasIds.push(item.id)
    };
    return null;
  });

  if (
    selectedSimulatorsId.length === 0 ||
    (selectedSimulatorsId.length > 0 && selectedSimulatorsId.length < hasIds.length)
  ) {
    return dispatch(selectAllSimulators());
  }

  if (selectedSimulatorsId.length === hasIds.length) {
    return dispatch(clearSelectedItems());
  }
}

export const toggleSelectItem = (simulatorId) => (dispatch, getState) => {
  const selectedSimulatorsId = getState().simulatorResults.selectedSimulatorsId;
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