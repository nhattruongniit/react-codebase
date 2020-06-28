import _ from 'lodash';

const SELECT_PROJECT = 'PROJECTS/SELECTED_PROJECT_IDS/SELECT_PROJECT';
const CLEAR_SELECTED_PROJECTS = 'PROJECTS/SELECTED_PROJECT_IDS/CLEAR_SELECTED_PROJECTS';

export const selectProject = (projectIds, selected) => ({
  type: SELECT_PROJECT,
  payload: { projectIds, selected },
});

export const selectAllProjects = () => (dispatch, getState) => {
  const { projectItems } = getState().projects.projects;
  const ids = projectItems.map(item => item.id);
  dispatch(selectProject(ids, true));
}

export const toggleSelectAllProjects = () => (dispatch, getState) => {
  const { projectItems } = getState().projects.projects;
  const selectedProjectIds = getState().projects.selectedProjectIds;

  if (
    selectedProjectIds.length === 0 ||
    (selectedProjectIds.length > 0 && selectedProjectIds.length < projectItems.length)
  ) {
    return dispatch(selectAllProjects());
  }

  if (selectedProjectIds.length === projectItems.length) {
    return dispatch(clearSelectedProjects());
  }
}

export const toggleSelectProject = (projectId) => (dispatch, getState) => {
  const selectedProjectIds = getState().projects.selectedProjectIds;
  const index = selectedProjectIds.indexOf(projectId);
  if (index === -1) {
    dispatch(selectProject([projectId], true));
  } else {
    dispatch(selectProject([projectId], false));
  }
}

export const clearSelectedProjects = () => ({
  type: CLEAR_SELECTED_PROJECTS,
});

export default function reducer(state = [], action) {
  switch (action.type) {
    case SELECT_PROJECT: {
      const { projectIds, selected } = action.payload;
      if (selected) {
        return _.union(state, projectIds);
      } else {
        return state.filter(id => projectIds.indexOf(id) === -1);
      }
    }

    case CLEAR_SELECTED_PROJECTS: {
      return [];
    }

    default:
      return state;
  }
}