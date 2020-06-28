import * as simulatorsApi from '../services/simulatorsApi';
import { clearSelectedItems } from './selectedSimulatorsId';
import { SORT_DIRECTION } from 'appConstants';

const SET_FILTER_KEYWORD = 'SIMULATORS/SET_FILTER_KEYWORD';
const FETCH_SIMULATORS_SUCCESS = 'SIMULATORS/FETCH_SIMULATORS_SUCCESS';
const FETCH_SIMULATORS_ERROR = 'SIMULATORS/FETCH_SIMULATORS_ERROR';
const UPDATE_SIMULATOR_ITEM = 'SIMULATORS/UPDATE_SIMULATOR_ITEM';
const REMOVE_SIMULATOR_ITEMS = 'SIMULATORS/REMOVE_SIMULATOR_ITEMS';
const REQUEST_DELETE_SIMULATOR = 'SIMULATORS/REQUEST_DELETE_SIMULATOR';
const CANCEL_DELETE_SIMULATOR = 'SIMULATORS/CANCEL_DELETE_SIMULATOR';
const REQUEST_DOWNLOAD_SIMULATION = 'SIMULATIORS/REQUEST_DOWNLOAD_SIMULATION';
const DUPLICATE_SIMULATORS_SUCCESS = 'SIMULATIORS/DUPLICATE_SIMULATORS_SUCCESS';
const FETCH_SINGLE_SIMULATOR_SUCCESS = 'SIMULATIORS/FETCH_SINGLE_SIMULATOR_SUCCESS';

export const requestDeleteSelectedSimulators = () => ({
  type: REQUEST_DELETE_SIMULATOR,
  payload: {
    isDeleting: true,
    deleteSelectedSimulator: true,
  },
});

export const requestDeleteSimulator = simulatorId => ({
  type: REQUEST_DELETE_SIMULATOR,
  payload: {
    isDeleting: true,
    simulatorId,
  },
});

export const confirmDeleteSimulator = () => (dispatch, getState) => {
  const { deleteSimulator: data } = getState().simulators.simulators;

  if (!data || !data.isDeleting) {
    return;
  }

  dispatch(cancelDeleteSimulator());

  if (data.simulatorId) return dispatch(deleteSimulator(data.simulatorId));
  if (data.deleteSelectedSimulator) return dispatch(deleteSelectedSimulators());
}

export const cancelDeleteSimulator = () => ({
  type: REQUEST_DELETE_SIMULATOR,
  payload: false,
});

export const setFilterKeyword = filterKeyword => ({
  type: SET_FILTER_KEYWORD,
  payload: { filterKeyword },
});

export const setViewName = (simulatorId, name) => async (dispatch) => {
  try {
    const res = await simulatorsApi.updateSimulation(simulatorId, { simulation_name: name });
    const updatedSimulator = res.data.data;
    dispatch(updateSimulatorItem(simulatorId, {
      ...updatedSimulator,
    }));
  } catch (e) {
    console.log('Unable to update simulator', e);
  }
}

export const deleteSelectedSimulators = () => async (dispatch, getState) => {
  const selectedSimulatorsId = getState().simulators.selectedSimulatorsId;
  await simulatorsApi.deleteMultipleSimulations(selectedSimulatorsId);
  dispatch(clearSelectedItems());
  dispatch({
    type: REMOVE_SIMULATOR_ITEMS,
    payload: { simulatorIds: selectedSimulatorsId },
  });

}

export const deleteSimulator = simulatorId => async dispatch => {
  dispatch(clearSelectedItems());
  dispatch({
    type: REMOVE_SIMULATOR_ITEMS,
    payload: { simulatorIds: [simulatorId] },
  });
  await simulatorsApi.deleteMultipleSimulations([simulatorId]);
}

export const fetchSimulations = (documentId, currentPage, perPage) => async (dispatch) => {
  dispatch(clearSelectedItems());
  dispatch(cancelDeleteSimulator());
  dispatch(setFilterKeyword(''))
  try {
    const res = await simulatorsApi.fetchSimulations(documentId, currentPage, perPage);
    const SIMULATORS = res.data;
    dispatch({
      type: FETCH_SIMULATORS_SUCCESS,
      payload: { 
        simulatorItems: SIMULATORS,
        documentId
      },
    });
  } catch (e) {
    dispatch({ type: FETCH_SIMULATORS_ERROR });
  }
}

export const updateSimulatorItem = (simulatorId, updateData) => ({
  type: UPDATE_SIMULATOR_ITEM,
  payload: { simulatorId, updateData },
});

export const downloadSimulations = (apiBaseUrl, simulation_id) => () => {
  window.open(simulatorsApi.downloadSimulations(apiBaseUrl, simulation_id))
}

export const downloadSelectedSimulations = (apiBaseUrl) => (dispatch, getState) => {
  dispatch({ type: REQUEST_DOWNLOAD_SIMULATION });
  const selectedSimulatorsId = getState().simulators.selectedSimulatorsId;
  for (const simulation_id of selectedSimulatorsId) {
    window.open(simulatorsApi.downloadSimulations(apiBaseUrl, simulation_id))
  }
}

export const duplicateSimulation = simulatorId => async (dispatch, getState) => {
  const documentId = getState().simulators.simulators.documentId;
  const currentPage = getState().simulators.simulators.meta.currentPage;
  const perPage = getState().simulators.simulators.meta.perPage;
  try {
    await simulatorsApi.duplicateSimulation(simulatorId);
    dispatch(fetchSimulations(documentId, currentPage, perPage))
  } catch (e) {
   console.log('==dupilcate error==', e)
  }
}

export const fetchSingleSimulation = simulatorId => async dispatch => {
  try {
    const response = await simulatorsApi.fetchSingleSimuation(simulatorId);
    const data = response.data.data;
    dispatch({
      type: FETCH_SINGLE_SIMULATOR_SUCCESS,
      payload: { data }
    })
  } catch (e) {
    console.log('==fetchSingleSimulation error==', e)
  }
}

export default function reducer(state = {
  simulatorItems: [],
  sortDirection: SORT_DIRECTION.ASC,
  deleteSimulator: {},
  simulator: {},
  documentId: null,
  meta: {
    currentPage: 1,
    perPage: 10,
    totalItems: 20,
  }
}, action) {
  switch (action.type) {
    case FETCH_SIMULATORS_SUCCESS: {
      return {
        ...state,
        simulatorItems: action.payload.simulatorItems.data,
        documentId: action.payload.documentId,
        meta: {
          currentPage: action.payload.simulatorItems.meta.current_page,
          perPage: Number(action.payload.simulatorItems.meta.per_page),
          totalItems: action.payload.simulatorItems.meta.total,
        }
      };
    }

    case SET_FILTER_KEYWORD: {
      return {
        ...state,
        filterKeyword: action.payload.filterKeyword,
      };
    }

    case UPDATE_SIMULATOR_ITEM: {
      const { simulatorId, updateData } = action.payload;
      return {
        ...state,
        simulatorItems: state.simulatorItems.map(item => {
          if (item.id === simulatorId) {
            return {
              ...item,
              ...updateData,
            };
          }
          return item;
        }),
      }
    }

    case REMOVE_SIMULATOR_ITEMS: {
      return {
        ...state,
        simulatorItems: state.simulatorItems.filter(item => action.payload.simulatorIds.indexOf(item.id) === -1),
      };
    }

    case REQUEST_DELETE_SIMULATOR: {
      return {
        ...state,
        deleteSimulator: action.payload,
      };
    }

    case CANCEL_DELETE_SIMULATOR: {
      return {
        ...state,
        deleteSimulator: {},
      };
    }

    case FETCH_SINGLE_SIMULATOR_SUCCESS: {
      return {
        ...state,
        simulator: action.payload.data
      }
    }

    default:
      return state;
  }
}