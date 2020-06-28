import { LOAD_INITIAL_STATE, RESTORE_STATE } from './tabs';
import chroma from 'chroma-js';
import {
  addVariableToSection,
  removeVariableFromSection,
  clearSections,
  setSectionLength
} from './plottedVariableSections';
import { clearSelectedVariables } from './variables';
import { clearChartValues } from './chartValues';

const ADD_PLOTTED_VARIABLES =
  'CHART_EDITOR/PLOTTED_VARIABLES/ADD_PLOTTED_VARIABLES';
const REMOVE_PLOTTED_VARIABLES =
  'CHART_EDITOR/PLOTTED_VARIABLES/REMOVE_PLOTTED_VARIABLES';
const REMOVE_PLOTTED_VARIABLE_ARRAY =
  'CHART_EDITOR/PLOTTED_VARIABLES/REMOVE_PLOTTED_VARIABLE_ARRAY';
const SELECT_PLOTTED_VARIBLES =
  'CHART_EDITOR/PLOTTED_VARIABLES/SELECT_PLOTTED_VARIBLES';
const UNSELECT_PLOTTED_VARIBLES =
  'CHART_EDITOR/PLOTTED_VARIABLES/UNSELECT_PLOTTED_VARIBLES';
const SET_PLOTTED_TYPE = 'CHART_EDITOR/PLOTTED_VARIABLES/SET_PLOTTED_TYPE';
const CLEAR_PLOTTED_VARIABLES ='CHART_EDITOR/PLOTTED_VARIABLES/CLEAR_PLOTTED_VARIABLES';

export function clearPlottedVariables() {
  return {
    type: CLEAR_PLOTTED_VARIABLES
  };
}

export function removePlottedVariableArray(variableIds) {
  return {
    type: REMOVE_PLOTTED_VARIABLE_ARRAY,
    payload: { variableIds }
  };
}

export function setPlottedType(plottedType) {
  return function(dispatch, getState) {
    const { currentPlottedType } = getState().chartEditor.plottedVariables;
    const { sections } = getState().chartEditor.plottedVariableSections;
    if (plottedType === currentPlottedType) return;

    dispatch(clearSelectedVariables());
    dispatch(clearPlottedVariables());
    dispatch(clearSections());
    dispatch(clearChartValues());
    dispatch({
      type: SET_PLOTTED_TYPE,
      payload: { plottedType }
    });

    if (plottedType === 'group' && sections.length === 0) {
      dispatch(setSectionLength(4));
    }
  };
}

export function addPlottedVariables(simulationId, simulationName, variable) {
  return function(dispatch, getState) {
    const { plottedType } = getState().chartEditor.plottedVariables;
    const {
      activeSectionId,
      sections
    } = getState().chartEditor.plottedVariableSections;

    if (plottedType === 'single') {
      dispatch({
        type: ADD_PLOTTED_VARIABLES,
        payload: {
          simulationId,
          simulationName,
          variable,
          color: chroma.random().hex()
        }
      });
    } else if (activeSectionId) {
      const section = sections.find(item => item.id === activeSectionId);
      let color = chroma(section.color)
        .brighten(section.variableIds.length * 0.8)
        .hex();
      dispatch({
        type: ADD_PLOTTED_VARIABLES,
        payload: {
          simulationId,
          simulationName,
          variable,
          color
        }
      });
      dispatch(addVariableToSection(variable.id));
    }
  };
}

export function removePlottedVariables(variableId) {
  return function(dispatch) {
    dispatch({
      type: REMOVE_PLOTTED_VARIABLES,
      payload: {
        variableId
      }
    });
    dispatch(removeVariableFromSection(variableId));
  };
}

export function selectPlottedVariable(variableId) {
  return {
    type: SELECT_PLOTTED_VARIBLES,
    payload: { variableId }
  };
}

export function togglePlottedVariable(variableId) {
  return function(dispatch, getState) {
    const isSelected = getState().chartEditor.plottedVariables
      .selectedVariables[variableId];
    if (isSelected === true) {
      dispatch({
        type: UNSELECT_PLOTTED_VARIBLES,
        payload: { variableId }
      });
    } else {
      dispatch({
        type: SELECT_PLOTTED_VARIBLES,
        payload: { variableId }
      });
    }
  };
}

const INITIAL_STATE = {
  variables: [],
  selectedVariables: {},
  plottedType: 'single'
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CLEAR_PLOTTED_VARIABLES: {
      return {
        ...state,
        variables: [],
        selectedVariables: {},
      }
    }
    case SET_PLOTTED_TYPE: {
      return {
        ...state,
        plottedType: action.payload.plottedType
      };
    }
    case ADD_PLOTTED_VARIABLES: {
      const { variable, simulationName, simulationId, color } = action.payload;
      return {
        ...state,
        variables: [
          ...state.variables,
          {
            ...variable,
            simulationName,
            simulationId,
            color
          }
        ]
      };
    }

    case REMOVE_PLOTTED_VARIABLES: {
      const { variableId } = action.payload;
      return {
        ...state,
        variables: state.variables.filter(item => item.id !== variableId),
        selectedVariables: {
          ...state.selectedVariables,
          [variableId]: false
        }
      };
    }

    case REMOVE_PLOTTED_VARIABLE_ARRAY: {
      const { variableIds } = action.payload;
      let { variables, selectedVariables } = state;
      variables = variables.filter(
        variable => variableIds.indexOf(variable.id) !== -1
      );
      variables.forEach(variable => {
        delete selectedVariables[variable.id];
      });
      return {
        ...state,
        ...variables,
        ...selectedVariables
      };
    }

    case SELECT_PLOTTED_VARIBLES: {
      const { variableId } = action.payload;
      return {
        ...state,
        selectedVariables: {
          ...state.selectedVariables,
          [variableId]: true
        }
      };
    }

    case UNSELECT_PLOTTED_VARIBLES: {
      const { variableId } = action.payload;
      return {
        ...state,
        selectedVariables: {
          ...state.selectedVariables,
          [variableId]: false
        }
      };
    }

    case LOAD_INITIAL_STATE: {
      return INITIAL_STATE;
    }

    case RESTORE_STATE: {
      if (action.payload.plottedVariables) {
        return action.payload.plottedVariables;
      }
      return state;
    }

    default: {
      return state;
    }
  }
}
