import * as projectApi from '../services/projectsApi';
import { clearSelectedDocuments, selectDocuments } from './selectedDocumentIds';

const FETCH_DOCUMENTS_START = 'PROJECTS/DOCUMENTS/FETCH_DOCUMENTS_START';
const FETCH_DOCUMENTS_SUCCESS = 'PROJECTS/DOCUMENTS/FETCH_DOCUMENTS_SUCCESS';
const FETCH_DOCUMENTS_ERROR = 'PROJECTS/DOCUMENTS/FETCH_DOCUMENTS_ERROR';

const SET_FILTER_KEYWORD = 'PROJECTS/DOCUMENTS/SET_FILTER_KEYWORD';
const UPDATE_ITEM = 'PROJECTS/DOCUMENTS/UPDATE_ITEM';
const ADD_DOCUMENT_ITEM = 'PROJECTS/DOCUMENTS/ADD_DOCUMENT_ITEM';
const REMOVE_DOCUMENT_ITEM = 'PROJECTS/DOCUMENTS/REMOVE_DOCUMENT_ITEM';
export const RESET_DOCUMENT_PAGE_STATE = 'PROJECTS/DOCUMENTS/RESET_DOCUMENT_PAGE_STATE';
const REQUEST_DELETE_DOCUMENT = 'PROJECTS/DOCUMENTS/REQUEST_DELETE_DOCUMENT';
const CANCEL_DELETE_DOCUMENT = 'PROJECTS/DOCUMENTS/CANCEL_DELETE_DOCUMENT';

export const requestDeleteSelectedDocuments = () => ({
  type: REQUEST_DELETE_DOCUMENT,
  payload: {
    isDeleting: true,
    deleteSelectedDocument: true,
  },
});

export const requestDeleteDocument = documentId => ({
  type: REQUEST_DELETE_DOCUMENT,
  payload: {
    isDeleting: true,
    documentId,
  },
});

export const confirmDeleteDocument = () => (dispatch, getState) => {
  const { deleteDocument: data } = getState().projects.documents;

  if (!data || !data.isDeleting) {
    return;
  }

  dispatch(cancelDeleteDocument());

  if (data.documentId) return dispatch(deleteDocument(data.documentId));
  if (data.deleteSelectedDocument) return dispatch(deleteSelectedDocuments());
}

export const cancelDeleteDocument = () => ({
  type: REQUEST_DELETE_DOCUMENT,
  payload: false,
});

export const resetDocumentPageState = () => async (dispatch, getState) => {
  const projectId = getState().project.id;
  const currentPage = getState().projects.documents.meta.currentPage;
  const perPage =  getState().projects.documents.meta.perPage;
  dispatch({ type: RESET_DOCUMENT_PAGE_STATE });
  dispatch(fetchDocuments(projectId, currentPage, perPage));
};

export const addDocumentItem = document => (dispatch, getState) => {
  const { project } = getState();
  if (project && document.project_id === project.id) {
    dispatch({
      type: ADD_DOCUMENT_ITEM,
      payload: { document },
    });
  }
}

export const setFilterKeyword = filterKeyword => ({
  type: SET_FILTER_KEYWORD,
  payload: { filterKeyword },
});

export const updateItem = (documentId, updateData) => ({
  type: UPDATE_ITEM,
  payload: { documentId, updateData },
});

export const deleteDocument = documentId => async (dispatch) => {
  dispatch({
    type: REMOVE_DOCUMENT_ITEM,
    payload: { documentId },
  });
  dispatch(selectDocuments([documentId], false));
  await projectApi.deleteDocument(documentId);
}

export const duplicateDocument = documentId => async () => {
  await projectApi.cloneDocuments([documentId]);
}

export const deleteSelectedDocuments = () => async (dispatch, getState) => {
  const selectedDocumentIds = getState().projects.selectedDocumentIds;
  const pms = selectedDocumentIds.map(documentId => projectApi.deleteDocument(documentId));
  await Promise.all(pms);
  dispatch(clearSelectedDocuments());
  selectedDocumentIds.forEach(documentId => dispatch({
    type: REMOVE_DOCUMENT_ITEM,
    payload: { documentId },
  }));
}

export const fetchDocuments = (projectId, currentPage, perPage) => async dispatch => {
  if(projectId) {
    dispatch({ type: FETCH_DOCUMENTS_START });
    try {
      const res = await projectApi.fetchDocuments(projectId, currentPage, perPage);
      const documents = res.data;
      documents.data.sort((d1, d2) => {
        return new Date(d2.updated_at) - new Date(d1.updated_at);
      })
      dispatch({
        type: FETCH_DOCUMENTS_SUCCESS,
        payload: { documents },
      });
    } catch (e) {
      dispatch({
        type: FETCH_DOCUMENTS_ERROR
      });
    }
  }
}

export const setDocumentName = (documentId, name) => async (dispatch) => {
  try {
    const res = await projectApi.updateDocument(documentId, { document_name: name });
    const updatedDocument = res.data.data;
    dispatch(updateItem(documentId, {
      ...updatedDocument,
    }));
  } catch (e) {
    console.log('Unable to update document', e);
  }
}

export const duplicateSelectedDocuments = () => async (dispatch, getState) => {
  const selectedDocumentIds = getState().projects.selectedDocumentIds;
  await projectApi.cloneDocuments(selectedDocumentIds);
  // right now our api return "{processing: true}" so we still need to wait for socket implementation
  // const documents = res.data.data;
  // documents.forEach(document => dispatch(addDocumentItem(document)));
  dispatch(clearSelectedDocuments());
}

const initialState = {
  documentItems: [],
  error: false,
  deleteDocument: {},
  meta: {
    currentPage: 1,
    perPage: 10,
    totalItems: 20,
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DOCUMENTS_SUCCESS: {
      return {
        ...state,
        documentItems: action.payload.documents.data,
        meta: {
          currentPage: action.payload.documents.meta.current_page,
          perPage: Number(action.payload.documents.meta.per_page),
          totalItems: action.payload.documents.meta.total,
        }
      };
    }

    case FETCH_DOCUMENTS_ERROR: {
      return {
        ...state,
        documentItems: [],
        error: true,
      };
    }

    case SET_FILTER_KEYWORD: {
      return {
        ...state,
        filterKeyword: action.payload.filterKeyword,
      };
    }

    case UPDATE_ITEM: {
      const { documentId, updateData } = action.payload;
      return {
        ...state,
        documentItems: state.documentItems.map(item => {
          if (item.id === documentId) {
            return {
              ...item,
              ...updateData,
            };
          }
          return item;
        }),
      }
    }

    case ADD_DOCUMENT_ITEM: {
      return {
        ...state,
        documentItems: [
          action.payload.document,
          ...state.documentItems,
        ],
      };
    }

    case REMOVE_DOCUMENT_ITEM: {
      return {
        ...state,
        documentItems: state.documentItems.filter(document => document.id !== action.payload.documentId),
      };
    }

    case RESET_DOCUMENT_PAGE_STATE: {
      return initialState;
    }

    case REQUEST_DELETE_DOCUMENT: {
      return {
        ...state,
        deleteDocument: action.payload,
      };
    }

    case CANCEL_DELETE_DOCUMENT: {
      return {
        ...state,
        deleteDocument: {},
      };
    }

    default:
      return state;
  }
}