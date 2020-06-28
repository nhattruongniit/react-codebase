import * as classListApi from '../services/classListApi';
import { START_FETCHING_CLASS_LIST } from './classList';

const SET_REFERENCE_ITEM_DATA = 'IDF_EDITOR/SET_REFERENCE_ITEM_DATA';

export const fetchReference = name => async (dispatch, getState) => {
  if (getState().references[name]) return null;

  const projectId = getState().projectId;
  const response = await classListApi.fetchReference(projectId, name);
  const data = response.data.data[name] || [];
  dispatch({
    type: SET_REFERENCE_ITEM_DATA,
    payload: { name, data }
  });
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case START_FETCHING_CLASS_LIST:
      return {};

    case SET_REFERENCE_ITEM_DATA: {
      const { name, data } = action.payload;
      return {
        ...state,
        [name]: data
      };
    }

    default:
      return state;
  }
}
