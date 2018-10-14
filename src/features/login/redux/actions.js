import { 
  LOGIN_SUCCESS, 
  LOGIN_FAIL 
} from './reducer';

// export function Login (text) {
//   return (dispatch) => {
//     fetch('https://www.google.com/search?q=secret+sauce').then(res => {
//       dispatch({
//         type: LOGIN_SUCCESS
//       });
//       console.log(res)
//     }).error(err => {
//       dispatch({
//         type: LOGIN_FAIL
//       });
//       console.log('err', err)
//     })
  
//   }
// }

export const loginFunc = () => (dispatch) => {
  // do something
  fetch('https://www.google.com/search?q=secret+sauce').then(res => {
    dispatch({
      type: LOGIN_SUCCESS
    });
    console.log(res)
  }).error(err => {
    dispatch({
      type: LOGIN_FAIL
    });
    console.log('err', err)
  })
}