import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import ModelEditor from 'modules/ModelEditor';
import SimulatorPage from '../../Simulators';
import { subscribeToDocumentChannel } from '../../../services/pusher';
import SimulationDetailsPage from './SimulationDetailsPage';

const DocumentDetailsPage = ({ match }) => {
  useEffect(() => {
    subscribeToDocumentChannel(match.params.documentId)
  }, []);
  return (
    <Switch>
      <Route
        path="/dashboard/:projectId/documents/:documentId/simulator/:simulationId"
        component={SimulationDetailsPage}
      />
      <Route path="/dashboard/:projectId/documents/:documentId/editor" component={ModelEditor} />
      <Route path="/dashboard/:projectId/documents/:documentId/simulator" component={SimulatorPage} />
    </Switch>
  );
}

export default withRouter(DocumentDetailsPage);