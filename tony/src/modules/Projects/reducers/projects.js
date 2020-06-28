import * as projectsApi from '../services/projectsApi';
import { clearSelectedProjects } from './selectedProjectIds';
import { SORT_DIRECTION } from 'appConstants';
import { toggleSortDirection } from 'reducers/dashboardOptions';


const SET_FILTER_KEYWORD = 'PROJECTS/PROJECTS/SET_FILTER_KEYWORD';
const FETCH_PROJECTS_SUCCESS = 'PROJECTS/PROJECTS/FETCH_PROJECTS_SUCCESS';
const FETCH_PROJECTS_ERROR = 'PROJECTS/PROJECTS/FETCH_PROJECTS_ERROR';
const UPDATE_PROJECT_ITEM = 'PROJECTS/PROJECTS/UPDATE_PROJECT_ITEM';
const ADD_PROJECT_ITEMS = 'PROJECTS/PROJECTS/ADD_PROJECT_ITEMS';
const REMOVE_PROJECT_ITEMS = 'PROJECTS/PROJECTS/REMOVE_PROJECT_ITEMS';
const REQUEST_DELETE_PROJECT = 'PROJECTS/PROJECTS/REQUEST_DELETE_PROJECT';
const CANCEL_DELETE_PROJECT = 'PROJECTS/PROJECTS/CANCEL_DELETE_PROJECT';


export const requestDeleteSelectedProjects = () => ({
  type: REQUEST_DELETE_PROJECT,
  payload: {
    isDeleting: true,
    deleteSelectedProject: true,
  },
});

export const requestDeleteProject = projectId => ({
  type: REQUEST_DELETE_PROJECT,
  payload: {
    isDeleting: true,
    projectId,
  },
});

export const confirmDeleteProject = () => (dispatch, getState) => {
  console.log('confirmDelete')
  const { deleteProject: data } = getState().projects.projects;

  if (!data || !data.isDeleting) {
    return;
  }

  dispatch(cancelDeleteProject());

  if (data.projectId) return dispatch(deleteProject(data.projectId));
  if (data.deleteSelectedProject) return dispatch(deleteSelectedProjects());
}

export const cancelDeleteProject = () => ({
  type: REQUEST_DELETE_PROJECT,
  payload: false,
});

export const addProjectItems = projectItems => ({
  type: ADD_PROJECT_ITEMS,
  payload: { projectItems },
});

export const setFilterKeyword = keyword => (dispatch, getState)=> {
  // dispatch({
  //   type: SET_FILTER_KEYWORD,
  //   payload: { filterKeyword },
  // })
  const { currentPage, perPage } = getState().projects.projects.meta;
  const { sortDirection } = getState().dashboardOptions;
  if(keyword === '' || keyword.length >= 3) {
    dispatch(fetchProjects(currentPage, perPage, sortDirection, keyword));
  }
};

export const updateProjectItem = (projectId, updateData) => ({
  type: UPDATE_PROJECT_ITEM,
  payload: { projectId, updateData },
});


export const deleteSelectedProjects = () => async (dispatch, getState) => {
  const { currentPage, perPage } = getState().projects.projects.meta;
  const { sortDirection } = getState().dashboardOptions;
  const selectedProjectIds = getState().projects.selectedProjectIds;
  dispatch(clearSelectedProjects());
  try {
    await projectsApi.deleteProjects(selectedProjectIds);
    dispatch(fetchProjects(currentPage, perPage, sortDirection));
  } catch (e) {
    dispatch({ type: FETCH_PROJECTS_ERROR });
  }
}

export const duplicateProject = projectId => async (dispatch, getState) => {
  const { perPage } = getState().projects.projects.meta;
  dispatch(clearSelectedProjects());
  try {
    await projectsApi.cloneProject(projectId);
    dispatch(fetchProjects(1, perPage, 'desc'));
  } catch (e) {
    dispatch({ type: FETCH_PROJECTS_ERROR });
  }
}

export const deleteProject = projectId => async (dispatch, getState) => {
  const { currentPage, perPage } = getState().projects.projects.meta;
  const { sortDirection } = getState().dashboardOptions;
  dispatch(clearSelectedProjects());
  try {
    await projectsApi.deleteProjects([projectId]);
    dispatch(fetchProjects(currentPage, perPage, sortDirection));
  } catch (e) {
    dispatch({ type: FETCH_PROJECTS_ERROR });
  }
}

export const fetchProjects = (currentPage, perPage, orderBy, keyword = '') => async dispatch => {
  // dispatch(setFilterKeyword(''))
  dispatch(clearSelectedProjects());
  try {
    const res = await projectsApi.fetchProjects(currentPage, perPage, orderBy, keyword);
    const projects = res.data;
    dispatch({
      type: FETCH_PROJECTS_SUCCESS,
      payload: { projectItems: projects },
    });
  } catch (e) {
    dispatch({ type: FETCH_PROJECTS_ERROR });
  }
}

export const actSortByDate = () => (dispatch, getState) => {
  dispatch(toggleSortDirection());
  const { currentPage, perPage } = getState().projects.projects.meta;
  const { sortDirection } = getState().dashboardOptions;
  dispatch(fetchProjects(currentPage, perPage, sortDirection));
}

export const duplicateSelectedProjects = () => async (dispatch, getState) => {
  const { perPage } = getState().projects.projects.meta;
  const selectedProjectIds = getState().projects.selectedProjectIds;
  const pms = selectedProjectIds.map(projectId => projectsApi.cloneProject(projectId));
  dispatch(clearSelectedProjects());
  try {
    await Promise.all(pms);
    dispatch(fetchProjects(1, perPage, 'desc'));
  } catch (e) {
    console.log(e);
  }
}

export const setProjectName = (projectId, name) => async (dispatch, getState) => {
  const { perPage } = getState().projects.projects.meta;
  try {
    await projectsApi.updateProject(projectId, { project_name: name });
    dispatch(fetchProjects(1, perPage, 'desc'));
  } catch (e) {
    console.log('Unable to update project', e);
  }
}

export default function reducer(state = {
  projectItems: [],
  deleteProject: {},
  filterKeyword: "",
  meta: {
    currentPage: 1,
    perPage: 10,
    totalItems: 20,
  }
}, action) {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCESS: {
      return {
        ...state,
        projectItems: action.payload.projectItems.data,
        meta: {
          currentPage: action.payload.projectItems.meta.current_page,
          perPage: Number(action.payload.projectItems.meta.per_page),
          totalItems: action.payload.projectItems.meta.total,
        }
      };
    }

    case SET_FILTER_KEYWORD: {
      return {
        ...state,
        filterKeyword: action.payload.filterKeyword,
      };
    }

    case UPDATE_PROJECT_ITEM: {
      const { projectId, updateData } = action.payload;
      return {
        ...state,
        projectItems: state.projectItems.map(item => {
          if (item.id === projectId) {
            return {
              ...item,
              ...updateData,
            };
          }
          return item;
        }),
      }
    }

    case ADD_PROJECT_ITEMS: {
      return {
        ...state,
        projectItems: [
          ...action.payload.projectItems,
          ...state.projectItems,
        ],
      };
    }

    case REMOVE_PROJECT_ITEMS: {
      return {
        ...state,
        projectItems: state.projectItems.filter(item => action.payload.projectIds.indexOf(item.id) === -1),
      };
    }

    case REQUEST_DELETE_PROJECT: {
      return {
        ...state,
        deleteProject: action.payload,
      };
    }

    case CANCEL_DELETE_PROJECT: {
      return {
        ...state,
        deleteProject: {},
      };
    }

    default:
      return state;
  }
}