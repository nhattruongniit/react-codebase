import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../../common/components/Header';
import Login from '../login';
import Register from '../register';
import Roster from '../roster';

class App extends Component {
  render() {
    return (
      <main>
        <Header />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/roster' component={Roster} />
        </Switch>
        {/* <img src="/assets/images/avatar.jpg" /> */}
      </main>
    );
  }
}

export default App;
