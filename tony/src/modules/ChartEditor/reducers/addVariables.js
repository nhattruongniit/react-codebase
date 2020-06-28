// import { DocumentSubtract20 } from '@carbon/icons-react/es'

// fetch projects
// fetch Document
// fetch simulations
import * as projectsApi from '../../Projects/services/projectsApi';
import * as viewsApi from '../../Views/services/viewsApi';
import * as api from '../services/api';
import { toast } from 'react-toastify';
import { addVariable } from './variables';
import { LOAD_INITIAL_STATE, RESTORE_STATE } from './tabs';

export const ADD_VARIABLES_TYPES = {
  PLOTTED_VARIABLES: 'PLOTTED_VARIABLES',
  ALL_VARIABLES: 'ALL_VARIABLES'
};

const SET_MODAL_SHOWING = 'CHART_EDITORS/ADD_VARIABLES/SET_MODAL_SHOWING';
const SET_TREE_DATA = 'CHART_EDITORS/ADD_VARIABLES/SET_TREE_DATA';
const SET_TREE_ITEM = 'CHART_EDITORS/ADD_VARIABLES/SET_TREE_ITEM';
const ADD_TREE_ITEM = 'CHART_EDITORS/ADD_VARIABLES/ADD_TREE_ITEM';

export function showModal() {
  return async function(dispatch) {
    const treeData = {};
    const res = await projectsApi.fetchProjects(0, 20);
    const projects = res.data.data;

    projects.forEach(project => {
      const key = 'project-' + project.id;
      const item = {
        key,
        id: project.id,
        type: 'project',
        root: true,
        label: project.project_name,
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
      type: SET_TREE_DATA,
      payload: treeData
    });

    dispatch({
      type: SET_MODAL_SHOWING,
      payload: true
    });
  };
}

export function hideModal() {
  return {
    type: SET_MODAL_SHOWING,
    payload: false
  };
}

export function fetchChildItems(item) {
  return async function(dispatch, getState) {
    const { id, type, items, key } = item;
    const additionTreeData = {};
    const parent = getState().chartEditor.addVariables.treeData[key];
    const childrenKeys = [];
    const perPage = 20;
    let res = null;

    if (type === 'project') {
      res = await projectsApi.fetchDocuments(id, parent.pagination.page + 1, perPage);
      res.data.data.forEach(document => {
        const key = 'document-' + document.id;
        const treeItem = {
          key,
          id: document.id,
          type: 'document',
          label: document.document_name,
          canExpand: true,
          items: [],
          isEmpty: false,
          pagination: {
            isEmpty: false,
            page: 0,
            loadMore: false,
          },
        };
        childrenKeys.push(key);
        additionTreeData[key] = treeItem;
      });
    }

    if (type === 'document') {
      res = await viewsApi.getSimulatorsByDocumentId(id, parent.pagination.page + 1, perPage);
      res.data.data.forEach(simulation => {
        const key = 'simulation-' + simulation.id;
        const treeItem = {
          key,
          id: simulation.id,
          type: 'simulation',
          label: simulation.simulation_name,
          canExpand: false
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
      type: ADD_TREE_ITEM,
      payload: additionTreeData
    });

    dispatch({
      type: SET_TREE_ITEM,
      payload: {
        key,
        item: parent
      }
    });
  };
}

export function submitVariables(addVariablesType, simulationId) {
  // fetch variables
  // check plotted variable
  return async function(dispatch, getState) {
    try {
      if (!simulationId) {
        toast('Please select at least one simulation', {
          type: 'error',
        });
        return;
      }
      const simulationResponse = await api.getSimulationById(simulationId);
      const variablesResponse = await api.fetchVariables(simulationId, 1, 200);
      const variables = variablesResponse.data.data;
      const simulation = simulationResponse.data.data;

      let matchedVariables = [];

      if (addVariablesType === ADD_VARIABLES_TYPES.ALL_VARIABLES) {
        matchedVariables = variables;
      } else {
        const plottedVariableIds = Object.keys(getState().chartEditor.variables.selectedVariables);
        const plottedVariables = plottedVariableIds.map(id => getState().chartEditor.variables.variablesById[id])
        matchedVariables = variables.filter(variable => {
          return !!plottedVariables.find(plottedVariable => plottedVariable.full_name === variable.full_name);
        });
      }

      if (matchedVariables.length === 0) {
        toast('There is no matching variables', {
          type: 'error',
        });
      } else {
        dispatch(addVariable(simulation.simulation_name, simulation.id, matchedVariables));
        dispatch(hideModal());
        //dispatch(addVariables(simulation, matchedVariables));
      }
    } catch (e) {
      console.log(e);
      toast('Error while adding variables', {
        type: 'error',
      });
    }


  }

}

export function removeVariables(simulation, variables) {}

const INITIAL_STATE = {
  isShowing: false,
  treeData: {}
};

export default function reducer(
  state = INITIAL_STATE,
  action
) {
  switch (action.type) {
    case SET_MODAL_SHOWING: {
      return {
        ...state,
        isShowing: action.payload
      };
    }

    case SET_TREE_DATA: {
      return {
        ...state,
        treeData: action.payload
      };
    }

    case SET_TREE_ITEM: {
      const { key, item } = action.payload;
      return {
        ...state,
        treeData: {
          ...state.treeData,
          [key]: item
        }
      };
    }

    case ADD_TREE_ITEM: {
      return {
        ...state,
        treeData: {
          ...state.treeData,
          ...action.payload
        }
      };
    }

    default:
      return state;
  }
}
