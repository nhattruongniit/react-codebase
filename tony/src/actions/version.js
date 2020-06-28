import request from '../services/request';
import { SET_VERSIONS } from 'appConstants';

export const loadVersions = () => {
    return dispatch => {
      request
        .get('/versions')
        .then(res => {
          dispatch(setListVersions(res.data.data));
        })
        .catch(err => {
          console.log(err);
        });
    };
  };

const setListVersions = version => ({
  type: SET_VERSIONS,
  payload: version
});
