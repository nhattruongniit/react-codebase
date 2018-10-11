import { LOGIN_SUCCESS } from './reducer';

export function login (text) {
  // return (dispatch) => {
  //   fetch('https://www.google.com/search?q=secret+sauce').then(res => {
  //     dispatch({
  //       type: LOGIN_SUCCESS
  //     });
  //     console.log(res)
  //   })
  
  // }
  return {
    type: LOGIN_SUCCESS,
    text
  }
}