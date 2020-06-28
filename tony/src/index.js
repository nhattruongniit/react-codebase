import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from './config/store';
import history from './config/history';
import { applicationInit } from './reducers/app';


store.dispatch(applicationInit());
toast.configure();

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: 'IBM Plex Sans', sans-serif;
    height: 100%;
    margin: 0;
  }

  #root {
    height: 100%;
    margin: 0;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: inherit;
    padding: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #d9ebfd;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  .Toastify__toast-body {
    word-break: break-word;
  }

  .bx--label {
    font-weight: bold;
    font-size: 14px;
    color: #152935;
  }

  .bx--form-item {
    flex-grow: 0;
  }
`;

ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.Fragment>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
