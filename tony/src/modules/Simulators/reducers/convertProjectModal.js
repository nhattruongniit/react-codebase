import * as simulatorsApi from '../services/simulatorsApi';

export const SET_MODAL_VISIBILITY = 'SIMULATORS/CONVERT_TO_PROJECT/SET_MODAL_VISIBILITY';
export const CONVERT_SIMULATOR_SUCCESS = 'SIMULATORS/CONVERT_TO_PROJECT/CONVERT_SIMULATOR_SUCCESS';

export const setModalVisibility = (simulationId, simulationName, isShowing) => ({
  type: SET_MODAL_VISIBILITY,
  payload: { 
    simulationId,
    simulationName,
    isShowing,
  },
});

export const actConvertSimToProject = project => ({
  type: SET_MODAL_VISIBILITY,
  payload: { project },
});

export const setModalConvertSimToProject = (simulationId, simulationName, showing) => async dispatch => {
  dispatch(setModalVisibility(simulationId, simulationName, showing));
}

export const convertSimToProject = simulationId => async (dispatch) => {
  try {
    // const res = await simulatorsApi.convertSimToProject(simulationId);
    // const project = res.data.data;
    await simulatorsApi.convertSimToProject(simulationId);
  } catch (e) {
    console.log('Unable to convert sim to project', e);
  }
}

export default function reducer(state = {
  isShowing: false,
  simulationId: null,
  simulationName: ''
}, action) {
  switch (action.type) {
    case SET_MODAL_VISIBILITY: {
      return {
        ...state,
        simulationId: action.payload.simulationId,
        isShowing: action.payload.isShowing,
        simulationName: action.payload.simulationName
      };
    }
    default: {
      return state;
    }
  }
}