import * as simulationResultsApi from '../services/simulatorResults';
import * as chartsApi from '../../Charts/services/chartsApi';
import history from 'config/history';
import { clearSelectedItems } from './selectedSimulatorsId';
import { SORT_DIRECTION } from 'appConstants';

const FETCH_FILE_SIMULATION = 'SIMULATION_RESULT/FETCH_FILE_SIMULATION';
const SET_FILTER_KEYWORD = 'SIMULATION_RESULT/SET_FILTER_KEYWORD';
const FETCH_SIMULATORS_SUCCESS = 'SIMULATION_RESULT/FETCH_SIMULATORS_SUCCESS';
const FETCH_SIMULATORS_ERROR = 'SIMULATION_RESULT/FETCH_SIMULATORS_ERROR';
const REMOVE_SIMULATOR_ITEMS = 'SIMULATION_RESULT/REMOVE_SIMULATOR_ITEMS';
const REQUEST_DELETE_SIMULATOR = 'SIMULATION_RESULT/REQUEST_DELETE_SIMULATOR';
const CANCEL_DELETE_SIMULATOR = 'SIMULATION_RESULT/CANCEL_DELETE_SIMULATOR';
const REQUEST_DOWNLOAD_SIMULATION = 'SIMULATION_RESULT/REQUEST_DOWNLOAD_SIMULATION';
const UPDATE_CHART_ITEM = 'SIMULATION_RESULT/UPDATE_CHART_ITEM';
const SET_ACCORDION = 'SIMULATION_RESULT/SET_ACCORDION';

export const setAccordion = isExpand => dispatch => {
  dispatch({
    type: SET_ACCORDION,
    payload: { isExpand }
  })
};

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

export const updateChartItem = (chartId, updateData) => ({
  type: UPDATE_CHART_ITEM,
  payload: { chartId, updateData },
});

export const confirmDeleteSimulator = () => (dispatch, getState) => {
  const { deleteSimulator: data } = getState().simulatorResults.simulationResults;

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

export const deleteSelectedSimulators = () => async (dispatch, getState) => {
  const selectedSimulatorsId = getState().simulatorResults.selectedSimulatorsId;
  await simulationResultsApi.deleteMultipleSimulations(selectedSimulatorsId);
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
  await simulationResultsApi.deleteMultipleSimulations([simulatorId]);
}

export const fetchSimulations = (documentId, currentPage, perPage) => async (dispatch) => {
  dispatch(clearSelectedItems());
  dispatch(cancelDeleteSimulator());
  try {
    const res = await simulationResultsApi.fetchSimulations(documentId, currentPage, perPage);
    const SIMULATORS = res.data;
    dispatch({
      type: FETCH_SIMULATORS_SUCCESS,
      payload: { simulatorItems: SIMULATORS },
    });
  } catch (e) {
    dispatch({ type: FETCH_SIMULATORS_ERROR });
  }
}

export const fetchFileSimulation = simulationId => async dispatch => {
  try {
    const [resCharts, resFiles] = await Promise.all([
      chartsApi.getChartsBySimulatorId(simulationId),
      simulationResultsApi.fetchFileSimulation(simulationId)
    ]);
    const data = [...resCharts.data.data,...resFiles.data.data];
    dispatch({
      type: FETCH_FILE_SIMULATION,
      payload: { data }
    })
  } catch (err) {
    console.log('===fetchFileSimulation error=', err)
  }
}

export const setChartName = (chartId, chartName, parentSimulationId, chartType, chartOption) => async (dispatch) => {
  const data = {
    "id": chartId,
    "chart_name": chartName,
    "parent_simulation_id": parentSimulationId,
    "type": chartType,
    "options": chartOption,
  }
  
  try {
    const res = await chartsApi.updateChart(chartId, data);
    const updateChart = res.data.data;
    dispatch(updateChartItem(chartId, {
      ...updateChart,
    }));
  } catch (e) {
    console.log('Unable to update view', e);
  }
}

export const openChart = (projectId, document_id, parent_simulation_id, chartId) => {
  const link = `/dashboard/${projectId}/documents/${document_id}/simulator/${parent_simulation_id}/charts/${chartId}/editor`;
  history.push(link);
}

export default function reducer(state = {
  simulationResults: [],
  simulatorItems: [],
  sortDirection: SORT_DIRECTION.ASC,
  deleteSimulator: {},
  meta: {
    currentPage: 1,
    perPage: 10,
    totalItems: 20,
  },
  isExpand: false
}, action) {
  switch (action.type) {
    case FETCH_FILE_SIMULATION: {
      return {
        ...state,
        simulationResults: action.payload.data
      }
    }
    case REMOVE_SIMULATOR_ITEMS: {
      return {
        ...state,
        simulationResults: state.simulationResults.filter(item => action.payload.simulatorIds.indexOf(item.id) === -1),
      };
    }
    case SET_FILTER_KEYWORD: {
      return {
        ...state,
        filterKeyword: action.payload.filterKeyword,
      };
    }

    case UPDATE_CHART_ITEM: {
      const { chartId, updateData } = action.payload;
      return {
        ...state,
        simulationResults: state.simulationResults.map(item => {
          if (item.id === chartId) {
            return {
              ...item,
              ...updateData,
            };
          }
          return item;
        }),
      }
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

    case SET_ACCORDION: {
      return {
        ...state,
        isExpand: action.payload.isExpand
      }
    }

    default:
      return state;
  }
}