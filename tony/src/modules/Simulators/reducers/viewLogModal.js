import * as simulatorsApi from '../services/simulatorsApi';

export const SET_MODAL_VIEW_LOG = 'SIMULATORS/SET_MODAL_VIEW_LOG';
export const GET_LOG_SIMULATION = 'SIMULATORS/GET_LOG_SIMULATION';

export const setModalViewLog = isShowing => ({
  type: SET_MODAL_VIEW_LOG,
  payload: { isShowing },
});

export const getLogSimulation = (simulation_id, data) => ({
  type: GET_LOG_SIMULATION,
  payload: { 
    simulation_id,
    data,
  }
})

export const viewLogSimulation = (simulation_id, page, per_page, hasLoadMore) => async dispatch => {
  const res = await simulatorsApi.getLogSimulation(simulation_id, page, per_page);
  if (!hasLoadMore) dispatch(setModalViewLog(true));
  dispatch(getLogSimulation(simulation_id, res.data));
}

export default function reducer(state = {
  isShowing: false,
  logsErr: [],
  simulationId: null,
  meta: {
    totalCount: 1,
    perPage: 30,
    currentPage: 1
  }
}, action) {
  switch (action.type) {
    case SET_MODAL_VIEW_LOG: {
      return {
        ...state,
        logsErr: [],
        isShowing: action.payload.isShowing,
        meta: {
          totalCount: 1,
          perPage: 30,
          currentPage: 1
        }
      };
    }
    case GET_LOG_SIMULATION: {
      return {
        ...state,
        logsErr: [...state.logsErr, ...action.payload.data.data],
        simulationId: action.payload.simulation_id,
        meta: {
          totalCount: action.payload.data.meta.total,
          perPage: Number(action.payload.data.meta.per_page),
          currentPage: action.payload.data.meta.current_page
        }
      }
    }
    default: {
      return state;
    }
  }
}