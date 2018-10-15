import { LOGIN_SUCCESS } from './reducer';

export const loginFn = text => dispatch => {
  console.log(text);
  fetch('https://www.google.com/search?q=secret+sauce').then(res => {
      dispatch({
        type: LOGIN_SUCCESS
      });
      console.log(res)
    })
}