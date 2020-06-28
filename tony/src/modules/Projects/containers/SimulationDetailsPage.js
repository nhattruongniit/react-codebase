import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import { fetchSimulation } from '../../../reducers/simulation';
import SimulatorResultsPage from '../../SimulatiorResults';
import ChartEditor from 'modules/ChartEditor';

const SimulationDetailsPage = ({ match, fetchSimulation }) => {
  useEffect(() => {
    fetchSimulation(match.params.simulationId);
  }, []);

  return (
    <Switch>
      <Route
        path="/dashboard/:projectId/documents/:documentId/simulator/:simulationId/charts/:chartId"
        component={ChartEditor}
      />
      <Route
        path="/dashboard/:projectId/documents/:documentId/simulator/:simulatorId/simulation-result"
        component={SimulatorResultsPage}
      />
    </Switch>
  );
};

const mapDispatchToProps = {
  fetchSimulation,
};

export default connect(null, mapDispatchToProps)(
  withRouter(SimulationDetailsPage)
);
