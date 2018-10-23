import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './common/components/Header';
import Login from './features/login';
import Register from './features/register';
import Roster from './features/roster';
import StopPropagation from './features/stop-propagation';
import ComponentPure from './features/pure-component';
import CommentBox from './features/comment';

class App extends Component {
  render() {
    return (
      <main>
        <Header />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/roster' component={Roster} />
          <Route path='/stop-propagation' component={StopPropagation} />
          <Route path='/pure-component' component={ComponentPure} />
          <Route path='/comment' component={CommentBox} />
        </Switch>
        {/* <img src="/assets/images/avatar.jpg" /> */}
      </main>
    );
  }
}

export default App;
