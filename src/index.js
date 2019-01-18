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

import './scss/index.css';

const history = createHistory();
const middleware = routerMiddleware(history);

// const composeEnhancers = process.env.NODE_ENV === 'production'
//   ? compose
//   : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === undefined // eslint-disable-line
//     ? compose
//     : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line

const store = createStore(
  connectRouter(history)(combinedReducers),
  compose(
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(middleware),
    applyMiddleware(thunk),
    // applyMiddleware(epicMiddleware),
  ),
);
ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Switch>
          <Route exact path="/:nameApp/login" component={Login} />
          <Route exact path="/:nameApp/register" component={Register} />
          <Route exact path="/:nameApp/forgot-password" component={ForgotPassword} />
          <Route exact path="/:nameApp/reset-password" component={ResetPassword} />
          <Route path="/:nameApp/" component={App} />
        </Switch>
      </MuiThemeProvider>
    </Provider>
  </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
