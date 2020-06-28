import React, { useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import AuthPage from './AuthPage';
import Main from '../containers/Main';
import { initPusher } from '../services/pusher';

const App = ({ verifyLogin, dispatch, history, location, user }) => {
  useEffect(() => {
    async function startup() {
      if (location.pathname.startsWith('/auth') === false) {
        const loginResult = await verifyLogin();
        if (!loginResult) {
          history.replace('/auth/login');
          return;
        }
        initPusher(dispatch);
      }
    }
    startup();
  }, []);

  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      {user &&
        <Route path="/" component={Main} />
      }

    </Switch>
  );
}

export default withRouter(App);
