import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Players from './players';
import List from './list';

export default class Roster extends Component {
  render() {
    return (
      <div>
        <h2>This is a roster page!</h2>
        <Switch>
          <Route exact path='/roster' component={List} />
          <Route path='/roster/:id' component={Players} />
        </Switch>
      </div>
    )
  }
}