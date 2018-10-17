import { combineReducers } from 'redux';

import LoginReducer from './features/login/redux/reducer';

const rootReducer = combineReducers({
  login: LoginReducer
})

export default rootReducer;