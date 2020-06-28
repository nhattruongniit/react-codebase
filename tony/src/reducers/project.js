import request from 'services/request';
export const SET_PROJECT = 'PROJECT/SET_PROJECT';

export const fetchProject = (projectId) => async (dispatch) => {
  const res = await request(`/projects/${projectId}`);
  dispatch({
    type: SET_PROJECT,
    payload: { project: res.data.data },
  });
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_PROJECT:
      return action.payload.project;
    default:
      return state;
  }
}
