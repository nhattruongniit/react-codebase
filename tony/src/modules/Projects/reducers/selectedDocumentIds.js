import _ from 'lodash';
import { RESET_DOCUMENT_PAGE_STATE } from './documents';

const SELECT_DOCUMENT = 'PROJECTS/SELECTED_DOCUMENT_IDS/SELECT_DOCUMENT';
const CLEAR_SELECTED_DOCUMENTS = 'PROJECTS/SELECTED_DOCUMENT_IDS/CLEAR_SELECTED_DOCUMENTS';

export const selectDocuments = (documentIds, selected) => ({
  type: SELECT_DOCUMENT,
  payload: { documentIds, selected },
});

export const selectAllDocuments = () => (dispatch, getState) => {
  const { documentItems } = getState().projects.documents;
  const ids = documentItems.map(item => item.id);
  dispatch(selectDocuments(ids, true));
}

export const toggleSelectAllDocuments = () => (dispatch, getState) => {
  const { documentItems } = getState().projects.documents;
  const selectedDocumentIds = getState().projects.selectedDocumentIds;

  if (
    selectedDocumentIds.length === 0 ||
    (selectedDocumentIds.length > 0 && selectedDocumentIds.length < documentItems.length)
  ) {
    return dispatch(selectAllDocuments());
  }

  if (selectedDocumentIds.length === documentItems.length) {
    return dispatch(clearSelectedDocuments());
  }
}

export const toggleSelectDocuments = (documentId) => (dispatch, getState) => {
  const selectedDocumentIds = getState().projects.selectedDocumentIds;
  const index = selectedDocumentIds.indexOf(documentId);
  if (index === -1) {
    dispatch(selectDocuments([documentId], true));
  } else {
    dispatch(selectDocuments([documentId], false));
  }
}

export const clearSelectedDocuments = () => ({
  type: CLEAR_SELECTED_DOCUMENTS,
});

export default function reducer(state = [], action) {
  switch (action.type) {
    case SELECT_DOCUMENT: {
      const { documentIds, selected } = action.payload;
      if (selected) {
        return _.union(state, documentIds);
      } else {
        return state.filter(id => documentIds.indexOf(id) === -1);
      }
    }

    case CLEAR_SELECTED_DOCUMENTS: {
      return [];
    }

    case RESET_DOCUMENT_PAGE_STATE: {
      return [];
    }

    default:
      return state;
  }
}