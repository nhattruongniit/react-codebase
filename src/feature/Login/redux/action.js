import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
} from './reducer';

export const storeAuthLogin = payload => ({ type: AUTH_LOGIN, payload });

export const storeAuthLogout = () => ({ type: AUTH_LOGOUT });
