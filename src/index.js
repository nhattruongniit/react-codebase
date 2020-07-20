import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { App, Login, Register, ForgotPassword, ResetPassword } from 'feature';
import combinedReducers from './reducer';
import * as serviceWorker from './serviceWorker';

import './scss/index.scss';

const history = createHistory();
const middleware = routerMiddleware(history);

// const composeEnhancers = process.env.NODE_ENV === 'production'
//   ? compose
//   : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === undefined // eslint-disable-line
//     ? compose
//     : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line
const composeEnhancers =
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(
  connectRouter(history)(combinedReducers),
  composeEnhancers(
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(middleware),
    applyMiddleware(thunk),
    // applyMiddleware(epicMiddleware),
  ),
);

const ReactApp = () => {
  console.log('app re-render app');
  return (
    <BrowserRouter>
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route path="/" component={App} />
          </Switch>
        </MuiThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};

ReactDOM.render(<ReactApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
