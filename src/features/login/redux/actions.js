import { 
  LOGIN_BEGIN,
  LOGIN_SUCCESS, 
  LOGIN_FAIL 
} from './reducer';

import axios from 'axios';

export function Login () {
  return (dispatch) => {
    dispatch({
        type: LOGIN_BEGIN
    });

    const promise = new Promise((resolve, reject) => {
      axios('https://api.coinmarketcap.com/v2/listings/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        dispatch({
          type: LOGIN_SUCCESS
        });
       resolve(res.data)
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAIL
        });
        reject(err.response)
      })
    });

    return promise
  }
}

// export const loginFunc = () => (dispatch) => {
//   // do something
//   dispatch({
//     type: LOGIN_BEGIN
//   })
//   fetch('https://api.coinmarketcap.com/v2/listings/').then(res => {
//     dispatch({
//       type: LOGIN_SUCCESS
//     });
//     console.log(res)
//   }).catch(err => {
//     dispatch({
//       type: LOGIN_FAIL
//     });
//     console.log('err', err)
//   })
// }