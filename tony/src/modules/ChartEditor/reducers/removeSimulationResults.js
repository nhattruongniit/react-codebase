import {
  removePlottedVariables,
  removePlottedVariableArray
} from './plottedVariables';
import { removeVariables, removeSimulation } from './variables';

const SET_IS_SHOWING = 'CHART_EDITOR/REMOVE_SIMULATION_RESULTS/SET_IS_SHOWING';

export function removeSimulationResults(simulationIds) {
  return function(dispatch, getState) {
    const { variablesBySimulations } = getState().chartEditor.variables;
    const simulations = simulationIds.map(
      simulationId => variablesBySimulations[simulationId]
    );
    simulations.forEach(simulation => {
      dispatch(removePlottedVariableArray(simulation.variableIds));
      dispatch(removeVariables(simulation.variableIds));
      dispatch(removeSimulation(simulation.simulationId));
    });
    dispatch(closeRemoveSimulationResultsModal());
  };
}

const INITIAL_STATE = {
  isShowingModal: false
};

export function showRemoveSimulationResultsModal() {
  return {
    type: SET_IS_SHOWING,
    payload: true
  };
}

export function closeRemoveSimulationResultsModal() {
  return {
    type: SET_IS_SHOWING,
    payload: false
  };
}

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_IS_SHOWING: {
      return {
        ...state,
        isShowingModal: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
