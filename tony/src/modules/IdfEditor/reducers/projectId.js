const SET_PROJECT_ID = 'IDF_EDITOR/SET_PROJECT_ID';

export const setProjectId = projectId => ({
  type: SET_PROJECT_ID,
  payload: { projectId }
});

export default function reducer(state = null, action) {
  switch (action.type) {
    case SET_PROJECT_ID: {
      return action.payload.projectId;
    }

    default:
      return state;
  }
}
