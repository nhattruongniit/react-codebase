import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProjectDetailsPage from './ProjectDetailsPage';
import ProjectPage from './projectDashboard/ProjectPage';


const Container = () => {
  return (
    <Switch>
      <Route path="/dashboard/:projectId" component={ProjectDetailsPage} />
      <Route path="/dashboard" component={ProjectPage} />
    </Switch>
  );
}

export default Container;