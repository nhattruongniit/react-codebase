// import jwtDecode from 'jwt-decode';

export const AUTH_LOGIN = 'KYC/AUTH/LOGIN';
export const AUTH_LOGOUT = 'KYC/AUTH/LOGOUT';

const initialState = {
  user: undefined,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_LOGIN:
      return {
        ...state,
        user: payload,
      };
    case AUTH_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
