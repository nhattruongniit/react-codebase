export const LOGIN_BEGIN = 'LOGIN_BEGIN';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

const initialState = {
    showLoading: false
}

export default function LoginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_BEGIN:
          return {
            ...state,
            showLoading: true
          }
        case LOGIN_SUCCESS:
          return {
            ...state,
            showLoading: false
          }
        case LOGIN_FAIL:
          return {
            ...state,
            showLoading: false
          }
        default:
          return state
      }
}