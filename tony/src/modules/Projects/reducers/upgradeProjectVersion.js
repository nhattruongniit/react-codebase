import * as projectApi from '../services/projectsApi';
import { clearSelectedProjects, selectProject } from './selectedProjectIds';
import { updateProjectItem } from './projects';

const SHOW_UPGRADE_PROJECT_MODAL = 'PROJECTS/UPGRADE_PROJECT_VERSION/SHOW_UPGRADE_PROJECT_MODAL';
const UPGRADE_VERSION_START = 'PROJECTS/UPGRADE_PROJECT_VERSION/UPGRADE_VERSION_START';
const UPGRADE_VERSION_SUCCESS = 'PROJECTS/UPGRADE_PROJECT_VERSION/UPGRADE_VERSION_SUCCESS';
const UPGRADE_VERSION_ERROR = 'PROJECTS/UPGRADE_PROJECT_VERSION/UPGRADE_VERSION_ERROR';

export const selectProjectAndShowUpgradeDialog = projectId => dispatch => {
  dispatch(selectProject([projectId], true));
  dispatch(showUpgradeProjectModal(true));
}

export const showUpgradeProjectModal = (isShowingModal = true) => ({
  type: SHOW_UPGRADE_PROJECT_MODAL,
  payload: { isShowingModal },
});

export const upgradeProjects = (version) => async (dispatch, getState) => {
  const projectIds = [...getState().projects.selectedProjectIds];

  dispatch(clearSelectedProjects());

  projectIds.forEach(projectId => {
    const projectStatus = getState().projects.upgradeProjectVersion.statusByProjectId[projectId];
    if (projectStatus && projectStatus.isUpgrading) return;

    dispatch({
      type: UPGRADE_VERSION_START,
      payload: { projectId }
    });

    return projectApi
      .upgradeProject(projectId, version.version)
      .then(() => {
        setTimeout(() => {
          dispatch({
            type: UPGRADE_VERSION_SUCCESS,
            payload: { projectId },
          });
        }, 3000);
        dispatch(updateProjectItem(projectId, {
          version_id: version.id,
        }));
      })
      .catch(error => {
        dispatch({
          type: UPGRADE_VERSION_ERROR,
          payload: {
            projectId,
            error: 'Error',
          }
        });
      });
  });
}

export default function reducer(state = {
  isShowingModal: false,
  isSelectingVersion: false,
  isDone: false,
  statusByProjectId: {},
}, action) {
  switch (action.type) {
    case SHOW_UPGRADE_PROJECT_MODAL: {
      return {
        ...state,
        isShowingModal: action.payload.isShowingModal,
        isSelectingVersion: true,
      };
    }

    case UPGRADE_VERSION_START: {
      const { projectId } = action.payload;
      const projectStatus = state.statusByProjectId[projectId] || {};
      projectStatus.isUpgrading = true;
      projectStatus.success = false;
      projectStatus.error = false;

      return {
        ...state,
        isSelectingVersion: false,
        statusByProjectId: {
          ...state.statusByProjectId,
          [projectId]: projectStatus,
        },
      };
    }

    case UPGRADE_VERSION_SUCCESS: {
      const { projectId } = action.payload;
      const projectStatus = state.statusByProjectId[projectId];
      projectStatus.success = true;
      projectStatus.isUpgrading = false;
      return {
        ...state,
        statusByProjectId: {
          ...state.statusByProjectId,
          [projectId]: projectStatus,
        },
      };
    }

    case UPGRADE_VERSION_ERROR: {
      const { projectId } = action.payload;
      const projectStatus = state.statusByProjectId[projectId];
      projectStatus.error = action.payload.error;
      projectStatus.isUpgrading = false;
      return {
        ...state,
        statusByProjectId: {
          ...state.statusByProjectId,
          [projectId]: projectStatus,
        },
      }
    }

    default: {
      return state;
    }
  }
}