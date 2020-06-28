import * as projectsApi from '../services/projectsApi';
import { addDocumentItem, RESET_DOCUMENT_PAGE_STATE } from './documents';

const SET_IS_SHOWING_MODAL = 'PROJECTS/CREATE_DOCUMENT_MODAL/SET_IS_SHOWING_MODAL';
const CREATE_IDF_DOCUMENT_START = 'PROJECTS/CREATE_DOCUMENT_MODAL/CREATE_IDF_DOCUMENT_START';
const CREATE_IDF_DOCUMENT_SUCCESS = 'PROJECTS/CREATE_DOCUMENT_MODAL/CREATE_IDF_DOCUMENT_SUCCESS';
const CREATE_IDF_DOCUMENT_ERROR = 'PROJECTS/CREATE_DOCUMENT_MODAL/CREATE_IDF_DOCUMENT_ERROR';

export const setIsShowingCreateIdfDocumentModal = isShowing => ({
  type: SET_IS_SHOWING_MODAL,
  payload: { isShowing },
});

export const showCreateIdfDocumentModal = () => dispatch => dispatch(setIsShowingCreateIdfDocumentModal(true));

export const hideCreateIdfDocumentModal = () => dispatch => dispatch(setIsShowingCreateIdfDocumentModal(false));

export const createDocument = title => async (dispatch, getState) => {
  const { project } = getState();
  if (!project) return;
  dispatch({ type: CREATE_IDF_DOCUMENT_START });
  try {
    await projectsApi.createDocument(title, project.id, project.version_id);
    dispatch({ type: CREATE_IDF_DOCUMENT_SUCCESS });
  } catch (e) {
    const message = e.response ? e.response.data.error : e.message;
    dispatch({
      type: CREATE_IDF_DOCUMENT_ERROR,
      payload: { error: message },
    });
  }
}

export const createDocumentFromFiles = files => async (dispatch, getState) => {
  const { project } = getState();
  if (!project) return;
  dispatch({ type: CREATE_IDF_DOCUMENT_START });
  try {
    const res = await projectsApi.createDocumentFromFile(project.id, files);
    dispatch({ type: CREATE_IDF_DOCUMENT_SUCCESS });
    // dispatch(addDocumentItem(res.data.data));
  } catch (e) {
    const message = e.response ? e.response.data.error : e.message;
    dispatch({
      type: CREATE_IDF_DOCUMENT_ERROR,
      payload: { error: message },
    });
  }
}

const initialState = {
  isShowing: false,
  isWorking: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_SHOWING_MODAL: {
      return {
        ...state,
        isShowing: action.payload.isShowing,
      };
    }

    case CREATE_IDF_DOCUMENT_START: {
      return {
        ...state,
        isWorking: true,
        error: null,
      };
    }

    case CREATE_IDF_DOCUMENT_SUCCESS: {
      return {
        ...state,
        isWorking: false,
        isShowing: false,
      };
    }

    case CREATE_IDF_DOCUMENT_ERROR: {
      return {
        ...state,
        isWorking: false,
        error: action.payload.error,
      };
    }

    case RESET_DOCUMENT_PAGE_STATE: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}