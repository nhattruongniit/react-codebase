import { createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux-subspace';
import logger from 'redux-logger';
import rootReducers from '../reducers';

const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const middlewares = [];
middlewares.push(thunk);
middlewares.push(logger);

const applyEnchancer = applyMiddleware(...middlewares);
const enchancer = composeEnhancers(applyEnchancer);

const reducers = combineReducers({
  ...rootReducers
});

const store = createStore(reducers, {}, enchancer);

export default store;
