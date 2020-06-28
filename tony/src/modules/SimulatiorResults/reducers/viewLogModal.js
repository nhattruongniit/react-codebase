import * as simulationResultsApi from '../services/simulatorResults';

export const SET_MODAL_VIEW_LOG = 'SIMULATION_RESULT/SET_MODAL_VIEW_LOG';
export const GET_FILE = 'SIMULATION_RESULT/GET_FILE';

export const setModalViewLog = isShowing => ({
  type: SET_MODAL_VIEW_LOG,
  payload: { isShowing },
});

export const getFileSimulation = (data) => ({
  type: GET_FILE,
  payload: { 
    data
  }
})

export const fetchSingleFile = (simulation_id, file_name) => async dispatch => {
  try {
    const response = await simulationResultsApi.fetchSingleFile(simulation_id, file_name);
    const data = response.data;
    dispatch(getFileSimulation(data));
    dispatch(setModalViewLog(true))
  } catch (err) {
    console.log('===fetchSingleFile err=', err);
    dispatch(setModalViewLog(true))
  }
}

export default function reducer(state = {
  isShowing: false,
  dataFile: '',
}, action) {
  switch (action.type) {
    case SET_MODAL_VIEW_LOG: {
      return {
        ...state,
        isShowing: action.payload.isShowing,
      };
    }
    case GET_FILE: {
      return {
        ...state,
        dataFile: action.payload.data
      }
    }
    default: {
      return state;
    }
  }
}