import request from 'services/request';
export const SET_MENU_VISIBILITY = 'SET_MENU_VISIBILITY';
export const SET_LOADING = 'SET_MENSET_LOADING_VISIBILITY';
export const SET_API_BASE_URL = 'SET_API_BASE_URL';

export const toggleMenu = () => (dispatch, getState) => {
  const showMenu = getState().app.showMenu;
  dispatch({
    type: SET_MENU_VISIBILITY,
    payload: { showMenu: !showMenu }
  });
};

export const setApiBaseUrl = apiBaseUrl => ({
  type: SET_API_BASE_URL,
  payload: { apiBaseUrl }
});

const setLoading = loading => ({
  type: SET_LOADING,
  payload: { loading }
});

export const applicationInit = () => async (dispatch, getState) => {
  let requestCount = 0;

  request.interceptors.request.use(
    config => {
      if (config.showSpinner) {
        requestCount++;
        dispatch(setLoading(true));
      }
      config.baseURL = getState().app.apiBaseUrl;
      return config;
    },
    error => {
      if (error.config.showSpinner) {
        decreaseRequestCount();
      }
      return Promise.reject(error);
    }
  );

  request.interceptors.response.use(
    res => {
      if (res.config.showSpinner) {
        decreaseRequestCount();
      }
      return res;
    },
    error => {
      if (error.config.showSpinner) {
        decreaseRequestCount();
      }
      return Promise.reject(error);
    }
  );

  function decreaseRequestCount() {
    requestCount--;
    console.log('decrease: request count', requestCount);
    if (requestCount === 0) {
      dispatch(setLoading(false));
    }
  }
};

export default function reducer(
  state = {
    showMenu: true,
    loading: false,
    apiBaseUrl: process.env.REACT_APP_BACKEND_URL
  },
  action
) {
  switch (action.type) {
    case SET_MENU_VISIBILITY:
      return {
        ...state,
        showMenu: action.payload.showMenu
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      };

    default:
      return state;
  }
}
