import * as api from '../services/api';
import {
  selectPlottedVariable,
  addPlottedVariables,
  removePlottedVariables
} from './plottedVariables';
import { LOAD_INITIAL_STATE, RESTORE_STATE } from './tabs';
import { toast } from 'react-toastify';
import { uniq } from 'lodash';

const FETCH_VARIABLES_START = 'CHART_EDITOR/VARIABLES/FETCH_VARIABLES_START';
const FETCH_VARIABLES_SUCCESS =
  'CHART_EDITOR/VARIABLES/FETCH_VARIABLES_SUCCESS';
const SET_VARIABLE_FILTER = 'CHART_EDITOR/VARIABLES/SET_VARIABLE_FILTER';
const REMOVE_VARIABLE_FILTER = 'CHART_EDITOR/VARIABLES/REMOVE_VARIABLE_FILTER';
const SELECT_VARIABLE = 'CHART_EDITOR/VARIABLES/SELECT_VARIABLE';
const UNSELECT_VARIABLE = 'CHART_EDITOR/VARIABLES/UNSELECT_VARIABLE';
const ADD_VARIABLE = 'CHART_EDITOR/VARIABLES/ADD_VARIABLE';
const SET_SIMULATION_ID = 'CHART_EDITOR/VARIABLES/SET_SIMULATION_ID';
const CLEAR_SELECTED_VARIABLES =
  'CHART_EDITOR/VARIABLES/CLEAR_SELECTED_VARIABLES';
const REMOVE_SIMULATION = 'CHART_EDITOR/VARIABLES/REMOVE_SIMULATION';
const REMOVE_VARIABLES = 'CHART_EDITOR/VARIABLES/REMOVE_VARIABLES';
const SET_UNITS = 'CHART_EDITOR/VARIABLES/SET_UNITS';

export function removeSimulation(simulationId) {
  return {
    type: REMOVE_SIMULATION,
    payload: { simulationId }
  };
}

export function removeVariables(variableIds) {
  return {
    type: REMOVE_VARIABLES,
    payload: { variableIds }
  };
}

export function clearSelectedVariables() {
  return {
    type: CLEAR_SELECTED_VARIABLES
  };
}

export function addVariable(simulationName, simulationId, variables) {
  return {
    type: ADD_VARIABLE,
    payload: {
      simulationId,
      simulationName,
      variables
    }
  };
}

export function toggleSelectVariable(variableId) {
  return (dispatch, getState) => {
    const {
      selectedVariables,
      variablesById,
      variablesBySimulations
    } = getState().chartEditor.variables;
    const variable = variablesById[variableId];

    if (
      Object.keys(selectedVariables).length > 0 &&
      !selectedVariables[variableId]
    ) {
      const firstVariableId = Object.keys(selectedVariables)[0];
      const firstVarible = variablesById[firstVariableId];
      if (firstVarible.type !== variable.type) {
        toast('Selected variables must have same type', {
          type: 'error'
        });
        return;
      }
    }

    const simulation = variablesBySimulations[variable.simulation_id];

    if (selectedVariables[variableId]) {
      dispatch({
        type: UNSELECT_VARIABLE,
        payload: {
          variableId
        }
      });

      dispatch(removePlottedVariables(variable.id));
    } else {
      dispatch({
        type: SELECT_VARIABLE,
        payload: {
          variableId
        }
      });
      dispatch(
        addPlottedVariables(
          simulation.simulationId,
          simulation.simulationName,
          variable
        )
      );
      dispatch(selectPlottedVariable(variableId));
    }
  };
}

export function setVariablesFilter(filterName, filterValue) {
  return {
    type: SET_VARIABLE_FILTER,
    payload: {
      filterName,
      filterValue
    }
  };
}

export function removeVariablesFilter(filterName) {
  return {
    type: REMOVE_VARIABLE_FILTER,
    payload: {
      filterName
    }
  };
}

export function fetchVariables(simulationId) {
  return async dispatch => {
    dispatch({ type: FETCH_VARIABLES_START });

    const pms = [
      api.fetchVariables(simulationId),
      api.getSimulationById(simulationId),
    ];
    const results = await Promise.all(pms);
    const variables = results[0].data.data;
    const simulation = results[1].data.data;
    const units = uniq(variables.map(item => item.units));

    dispatch({
      type: SET_UNITS,
      payload: { units },
    });

    dispatch({
      type: ADD_VARIABLE,
      payload: {
        variables,
        simulationId: simulation.id,
        simulationName: simulation.simulation_name
      }
    });

    dispatch({
      type: SET_SIMULATION_ID,
      payload: { simulationId }
    });

    dispatch({
      type: FETCH_VARIABLES_SUCCESS
    });
  };
}

const INITIAL_STATE = {
  variablesBySimulations: {},
  selectedVariables: {},
  filters: {},
  variablesById: {},
  simulationId: null,
  units: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_VARIABLES_START: {
      return {
        ...state,
        variables: [],
        variablesBySimulations: {},
        variablesById: {},
        filters: {},
        units: [],
      };
    }

    case SET_UNITS: {
      return {
        ...state,
        units: action.payload.units,
      }
    }

    case SET_VARIABLE_FILTER: {
      const { filterName, filterValue } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [filterName]: filterValue
        }
      };
    }

    case REMOVE_VARIABLE_FILTER: {
      const { filterName } = action.payload;
      delete state.filters[filterName];
      return {
        ...state,
        ...state.filters
      };
    }

    case SELECT_VARIABLE: {
      const { variableId } = action.payload;
      return {
        ...state,
        selectedVariables: {
          ...state.selectedVariables,
          [variableId]: true
        }
      };
    }

    case UNSELECT_VARIABLE: {
      const { variableId } = action.payload;
      delete state.selectedVariables[variableId];
      return {
        ...state,
        selectedVariables: {
          ...state.selectedVariables
        }
      };
    }

    case SET_SIMULATION_ID: {
      return {
        ...state,
        simulationId: action.payload.simulationId
      };
    }

    case ADD_VARIABLE: {
      const { simulationName, simulationId, variables } = action.payload;
      const variablesById = {};
      const variableIds = [];

      variables.forEach(variable => {
        variablesById[variable.id] = variable;
        variableIds.push(variable.id);
      });

      return {
        ...state,
        variablesById: {
          ...state.variablesById,
          ...variablesById
        },
        variablesBySimulations: {
          ...state.variablesBySimulations,
          [simulationId]: {
            simulationId,
            simulationName,
            variableIds,
            order: Object.keys(state.variablesBySimulations).length
          }
        }
      };
    }

    case REMOVE_SIMULATION: {
      const { variablesBySimulations } = state;
      const { simulationId } = action.payload;
      delete variablesBySimulations[simulationId];
      return {
        ...state,
        ...variablesBySimulations
      };
    }

    case REMOVE_VARIABLES: {
      const { variablesById, selectedVariables } = state;
      const { variableIds } = action.payload;

      variableIds.forEach(variableId => {
        delete variablesById[variableId];
        delete selectedVariables[variableId];
      });

      return {
        ...state,
        ...variablesById,
        ...selectedVariables
      };
    }

    case CLEAR_SELECTED_VARIABLES: {
      return {
        ...state,
        selectedVariables: {}
      };
    }

    case LOAD_INITIAL_STATE: {
      return INITIAL_STATE;
    }

    case RESTORE_STATE: {
      if (action.payload.variables) {
        return action.payload.variables;
      }
      return state;
    }

    default: {
      return state;
    }
  }
}
