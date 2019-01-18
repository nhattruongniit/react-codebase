import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

// IMPORT_STORES
import { loadingReducer } from 'feature/Loading';
import { authReducer } from 'feature/Login';
import { kycReducer } from 'feature/Kyc';

const allReducers = {
  // CONNECT_STORES
  auth: authReducer,
  kyc: kycReducer,
  form,
  loadingModal: loadingReducer,
};

export default combineReducers({
  ...allReducers,
  router: routerReducer,
});
