import * as chartApi from '../../Charts/services/chartsApi';
import history from 'config/history';

export const SET_MODAL_VISIBILITY =
  'SIMULATOR_RESULTS/CREATE_NEW_MODAL/SET_MODAL_VISIBILITY';

export const setModalVisibility = isShowing => ({
  type: SET_MODAL_VISIBILITY,
  payload: {
    isShowing
  }
});

export const createNewChart = (
  chart_name,
  parent_simulation_id,
  type,
  options
) => async (dispatch, getState) => {
  try {
    const {
      project,
      simulators: {
        simulators: {
          simulator: { document_id }
        }
      }
    } = getState();
    const result = await chartApi.createChart(
      chart_name,
      parent_simulation_id,
      type,
      options
    );
    const chartId = result.data.data.id;
    const link = `/dashboard/${project.id}/documents/${document_id}/simulator/${parent_simulation_id}/charts/${chartId}/editor`;
    history.push(link);
  } catch (err) {
    console.log('===simulation result create chart err', err);
  }
};

export default function reducer(
  state = {
    isShowing: false
  },
  action
) {
  switch (action.type) {
    case SET_MODAL_VISIBILITY: {
      return {
        ...state,
        isShowing: action.payload.isShowing
      };
    }
    default: {
      return state;
    }
  }
}
