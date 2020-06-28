import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import DocumentPage from './documentDashboard/DocumentPage';
import ViewPage from 'modules/Views';
import ChartPage from 'modules/Charts';
import { fetchProject } from '../../../reducers/project';
import { fetchDocuments } from 'modules/Projects/reducers/documents';
import DocumentDetailsPage from './DocumentDetailsPage';

const ProjectDetailsPage = ({ fetchProject, currentPage, perPage, fetchDocuments, match }) => {
  useEffect(() => {
    if (match.params.projectId) {
      fetchProject(match.params.projectId);
      fetchDocuments(match.params.projectId, currentPage, perPage);
    }
  }, []);

  return (
    <Switch>
      <Route path="/dashboard/:projectId/documents/:documentId" component={DocumentDetailsPage} />
      <Route path="/dashboard/:projectId/documents" component={DocumentPage} />
      <Route
        path="/dashboard/:projectId/views/:viewId/charts"
        component={ChartPage}
      />
      <Route path="/dashboard/:projectId/views" component={ViewPage} />
    </Switch>
  );
};

const mapStateToProps = state => {
  const {
    projects: {
      documents: {
        meta: {
          currentPage,
          perPage
        }
      }
    }
  } = state;

  return {
    currentPage,
    perPage
  };
}
const mapDispatchToProps = {
  fetchProject,
  fetchDocuments
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(ProjectDetailsPage));
