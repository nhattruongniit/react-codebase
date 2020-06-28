import * as projectApi from '../services/projectsApi';
import { clearSelectedDocuments, selectDocuments } from './selectedDocumentIds';
import { updateItem, RESET_DOCUMENT_PAGE_STATE } from './documents';

const SHOW_UPGRADE_DOCUMENT_MODAL = 'PROJECTS/UPGRADE_DOCUMENT_VERSION/SHOW_UPGRADE_DOCUMENT_MODAL';
const UPGRADE_VERSION_START = 'PROJECTS/UPGRADE_DOCUMENT_VERSION/UPGRADE_VERSION_START';
const UPGRADE_VERSION_SUCCESS = 'PROJECTS/UPGRADE_DOCUMENT_VERSION/UPGRADE_VERSION_SUCCESS';
const UPGRADE_VERSION_ERROR = 'PROJECTS/UPGRADE_DOCUMENT_VERSION/UPGRADE_VERSION_ERROR';

export const selectDocumentAndShowUpgradeDialog = documentId => dispatch => {
  dispatch(selectDocuments([documentId], true));
  dispatch(showUpgradeDocumentModal());
}

export const showUpgradeDocumentModal = () => ({
  type: SHOW_UPGRADE_DOCUMENT_MODAL,
  payload: { isShowingModal: true },
});

export const hideUpgradeDocumentModal = () => ({
  type: SHOW_UPGRADE_DOCUMENT_MODAL,
  payload: { isShowingModal: false },
});

export const upgradeDocuments = (upgradeData) => async (dispatch, getState) => {
  const selectedDocumentIds = getState().projects.selectedDocumentIds;
  const project = getState().projects.projects.projectItems.find(item => item.id === upgradeData.targetProjectId);
  const targetVersionId = upgradeData.version ? upgradeData.version.id : project ? project.version_id : null;
  const targetVersion = upgradeData.version ? upgradeData.version.version : project ? project.version : null;
  dispatch({
    type: UPGRADE_VERSION_START,
    payload: { documentIds: selectedDocumentIds },
  });

  return projectApi
    .upgradeDocuments(
      selectedDocumentIds,
      targetVersion,
      upgradeData.projectName,
      upgradeData.targetProjectId,
    )
    .then(() => {
      dispatch(clearSelectedDocuments());
      dispatch(hideUpgradeDocumentModal());
      if (targetVersionId) {
        selectedDocumentIds.forEach(documentId => {
          dispatch(updateItem(documentId, {
            version_id: targetVersionId,
          }));
        });
      }
    })
    .catch(error => {
      const errorMessage = error.response && error.response.data ? error.response.data.error : error.message;
      dispatch({
        type: UPGRADE_VERSION_ERROR,
        payload: {
          documentIds: selectedDocumentIds,
          error: errorMessage,
        },
      });
    });
}

const initialState = {
  isShowingModal: false,
  isSelectingOptions: false,
  isDone: false,
  statusByDocumentId: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_UPGRADE_DOCUMENT_MODAL: {
      return {
        ...state,
        isShowingModal: action.payload.isShowingModal,
        isSelectingOptions: true,
      };
    }

    case UPGRADE_VERSION_START: {
      const { documentIds } = action.payload;
      const updatedStatus = {};

      documentIds.forEach(documentId => {
        updatedStatus[documentId] = {
          ...(state.statusByDocumentId[documentId] || {}),
          isUpgrading: true,
          success: false,
          error: false,
        }
      });

      return {
        ...state,
        isSelectingOptions: false,
        statusByDocumentId: {
          ...state.statusByDocumentId,
          ...updatedStatus,
        },
      };
    }

    case UPGRADE_VERSION_SUCCESS: {
      const { documentIds } = action.payload;
      const updatedStatus = {};

      documentIds.forEach(documentId => {
        updatedStatus[documentId] = {
          ...(state.statusByDocumentId[documentId] || {}),
          isUpgrading: false,
          success: true,
          error: false,
        }
      });

      return {
        ...state,
        isSelectingOptions: false,
        statusByDocumentId: {
          ...state.statusByDocumentId,
          ...updatedStatus,
        },
      };
    }

    case UPGRADE_VERSION_ERROR: {
      const { documentIds } = action.payload;
      const updatedStatus = {};

      documentIds.forEach(documentId => {
        updatedStatus[documentId] = {
          ...(state.statusByDocumentId[documentId] || {}),
          isUpgrading: false,
          success: false,
          error: action.payload.error,
        }
      });

      return {
        ...state,
        isSelectingOptions: false,
        statusByDocumentId: {
          ...state.statusByDocumentId,
          ...updatedStatus,
        },
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