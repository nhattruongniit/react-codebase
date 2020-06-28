import { UserManager } from 'oidc-client';
import config from '../config/oidc';
import { setApiBaseUrl } from './app';

const userManager = new UserManager(config);

const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
const SET_LOGIN_USER = 'SET_LOGIN_USER';

const setLoginError = error => ({
  type: SET_LOGIN_ERROR,
  payload: { error }
});

const setLoginUser = user => ({
  type: SET_LOGIN_USER,
  payload: { user }
});

export const requestLogin = () => () => {
  console.log('Redirect to login page');
  userManager.signinRedirect();
};

export const verifyLogin = () => async dispatch => {
  const user = await userManager.getUser();
  if (!user) return false;
  if (user.expires_at < new Date().getTime() / 1000) {
    return false;
  }
  dispatch(setLoginUser(user));
  if (user.profile && user.profile.endpoint) {
    dispatch(setApiBaseUrl(user.profile.endpoint));
  }
  return true;
};

export const processLoginCallback = () => async dispatch => {
  try {
    const user = await userManager.signinRedirectCallback();
    if (!user) {
      dispatch(setLoginError(true));
      return false;
    }
    dispatch(setLoginUser(user));
    if (user.profile && user.profile.endpoint) {
      dispatch(setApiBaseUrl(user.profile.endpoint));
    }
    return true;
  } catch (e) {
    dispatch(setLoginError(true));
    return false;
  }
};

export default function reducer(
  state = {
    user: null
  },
  action
) {
  switch (action.type) {
    case SET_LOGIN_USER: {
      return {
        ...state,
        user: action.payload.user
      };
    }

    case SET_LOGIN_ERROR: {
      return {
        ...state,
        error: true
      };
    }

    default:
      return state;
  }
}
