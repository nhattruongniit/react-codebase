import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginPage from '../../containers/AuthPage/LoginPage';
import LoginCallbackPage from '../../containers/AuthPage/LoginCallbackPage';
import LogoutPage from './LogoutPage';

const AuthPage = () => (
  <Switch>
    <Route path="/auth/login" component={LoginPage} />
    <Route path="/auth/callback" component={LoginCallbackPage} />
    <Route path="/auth/logout" component={LogoutPage} />
  </Switch>
)

export default AuthPage;
