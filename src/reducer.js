import { combineReducers } from 'redux';

import LoginReducer from 'feature/Login/redux/reducer';

const rootReducer = combineReducers({
    login: LoginReducer
});

export default rootReducer;