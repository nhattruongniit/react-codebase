export const LOGIN_BEGIN = 'LOGIN_BEGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

const initialState = {
  showLoading: false
}

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_BEGIN':
      return {
        ...state,
      }
    default:
      return state
  }
}