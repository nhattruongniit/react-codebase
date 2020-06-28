import _ from 'lodash';
import chroma from 'chroma-js';
import { RESTORE_STATE, LOAD_INITIAL_STATE } from './tabs';
const ADD_SECTION = 'CHART_EDITOR/PLOTTED_VARIABLE_SECTIONS/ADD_SECTION';
const REMOVE_SECTION = 'CHART_EDITOR/PLOTTED_VARIABLE_SECTIONS/REMOVE_SECTION';
const SET_SECTION_NAME =
  'CHART_EDITOR/PLOTTED_VARIABLE_SECTIONS/SET_SECTION_NAME';
const SET_ACTIVE_SECTION =
  'CHART_EDITOR/PLOTTED_VARIABLE_SECTIONS/SET_ACTIVE_SECTION';
const ADD_VARIABLE_TO_SECTION =
  'CHART_EDITOR/PLOTTED_VARIABLE_SECTIONS/ADD_VARIABLE_TO_SECTION';
const REMOVE_VARIABLE_FROM_SECTION =
  'CHART_EDITOR/PLOTTED_VARIABLE_SECTIONS/REMOVE_VARIABLE_FROM_SECTION';
const REDUCE_SECTION_BY_LENGTH =
  'CHART_EDITOR/PLOTTED_VARIABLE_SECTIONS/REDUCE_SECTION_BY_LENGTH';
const CLEAR_SECTIONS = 'CHART_EDITOR/PLOTTED_VARIABLE_SECTIONS/CLEAR_SECTIONS';
const SET_SECTION_DATETIME = 'CHART_EDITOR/PLOTTED_VARIABLE_SECTIONS/SET_SECTION_DATETIME';

export function setSectionDateTime(sectionId, fieldName, value) {
  return {
    type: SET_SECTION_DATETIME,
    payload: {
      sectionId,
      fieldName,
      value,
    }
  };
}

export function clearSections() {
  return {
    type: CLEAR_SECTIONS
  }
}

export function addVariableToSection(variableId) {
  return function (dispatch, getState) {
    const { activeSectionId, sections } = getState().chartEditor.plottedVariableSections;
    const section = sections.find(section => section.id === activeSectionId);
    if (section) {
      dispatch({
        type: ADD_VARIABLE_TO_SECTION,
        payload: {
          variableId,
          sectionId: section.id
        }
      });
    }

  }
}

export function removeVariableFromSection(variableId) {
  return function (dispatch, getState) {
    const { sections } = getState().chartEditor.plottedVariableSections;
    const section = sections.find(section => section.variableIds.indexOf(variableId) !== -1);
    if (section) {
      dispatch({
        type: REMOVE_VARIABLE_FROM_SECTION,
        payload: {
          variableId,
          sectionId: section.id,
        }
      });
    }

  }
}

export function setActiveSection(sectionId) {
  return {
    type: SET_ACTIVE_SECTION,
    payload: { sectionId }
  };
}

export function setSectionLength(sectionLength) {
  return function(dispatch, getState) {
    const { sections } = getState().chartEditor.plottedVariableSections;
    if (sections.length < sectionLength) {
      const diff = sectionLength - sections.length;
      _.range(diff).map(() => {
        const color = chroma.random().darken(2).hex();
        dispatch({
          type: ADD_SECTION,
          payload: { color },
        });
      });
    } else {
      dispatch({
        type: REDUCE_SECTION_BY_LENGTH,
        payload: { sectionLength }
      });
    }
  };
}

const INITIAL_STATE = {
  sections: [],
  activeSectionId: []
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_SECTION: {
      return {
        ...state,
        sections: [
          ...state.sections,
          {
            id: state.sections.length + 1,
            variableIds: [],
            color: action.payload.color,
            datetime: {},
          }
        ]
      };
    }

    case REMOVE_SECTION: {
      return {
        ...state,
        sections: state.sections.filter(
          section => section.id === action.payload.sectionId
        ),
        activeSectionId: null
      };
    }

    case SET_ACTIVE_SECTION: {
      return {
        ...state,
        activeSectionId: action.payload.sectionId
      };
    }

    case SET_SECTION_NAME: {
      const { sectionId, name } = action.payload;
      return {
        ...state,
        sections: state.sections.map(section => {
          if (section.id === sectionId) {
            return {
              ...section,
              name
            };
          }
          return section;
        })
      };
    }

    case ADD_VARIABLE_TO_SECTION: {
      const { sectionId, variableId } = action.payload;
      return {
        ...state,
        sections: state.sections.map(section => {
          if (section.id === sectionId) {
            return {
              ...section,
              variableIds: [...section.variableIds, variableId]
            };
          }
          return section;
        })
      };
    }

    case REMOVE_VARIABLE_FROM_SECTION: {
      const { sectionId, variableId } = action.payload;
      return {
        ...state,
        sections: state.sections.map(section => {
          if (section.id === sectionId) {
            return {
              ...section,
              variableIds: section.variableIds.filter(id => id !== variableId)
            };
          }
          return section;
        })
      };
    }

    case REDUCE_SECTION_BY_LENGTH: {
      const { sectionLength } = action.payload;
      return {
        ...state,
        sections: [...state.sections.slice(sectionLength)]
      };
    }

    case SET_SECTION_DATETIME: {
      const { sectionId, fieldName, value } = action.payload;
      return {
        ...state,
        sections: state.sections.map(section => {
          if (section.id === sectionId) {
            return {
              ...section,
              datetime: {
                ...section.datetime,
                [fieldName]: value
              }
            };
          }
          return section;
        })
      };
    }

    case CLEAR_SECTIONS: {
      return {
        sections: [],
        activeSectionId: null,
      };
    }

    case RESTORE_STATE: {
      if (action.payload.plottedVariableSections) {
        return action.payload.plottedVariableSections;
      }
      return state;
    }

    case LOAD_INITIAL_STATE: {
      return INITIAL_STATE;
    }

    default: {
      return state;
    }
  }
}
