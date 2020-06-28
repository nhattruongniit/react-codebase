import request from 'services/request';
export const SET_SIMULATION = 'ROOT/SET_SIMULATION';

export const fetchSimulation = (simulationId) => async (dispatch) => {
  const res = await request(`/simulations/${simulationId}`);
  dispatch({
    type: SET_SIMULATION,
    payload: { simulation: res.data.data },
  });
}

export default function reducer(state = null, action) {
  switch (action.type) {
    case SET_SIMULATION:
      return action.payload.simulation;
    default:
      return state;
  }
}
