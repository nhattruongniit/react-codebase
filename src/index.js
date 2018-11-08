import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

import { App, Login, Register } from './feature';
import * as serviceWorker from './serviceWorker';

import './scss/index.css';

const middleware = applyMiddleware(thunk);

const store = createStore(
    rootReducer,
    compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/' component={App} />
                <Route path='**' component={Register} />
            </Switch>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
