import React, { useEffect } from 'react';
import { withRouter, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getChartsByView, fetchSingleView } from '../reducers/charts';

import ChartToolbar from './ChartToolbar';
import ChartList from './ChartList';
import DeleteChartModal from './DeleteChartModal';
import CreateChartModal from './CreateChartModal';
import ChartTooltip from './ChartTooltip';
import AddRemoveModal from './AddRemoveModal';

const Wrapper = styled.div`
  padding: 50px 100px;
  margin: 0 auto;
  position: relative;
`;

const StyledBreadcrumb = styled.div`
  font-size: 14px;
  line-height: 1.29;
  color: #3d70b2;
  margin-bottom: 20px;
  a {
    text-decoration: none;
  }
`;

const StyledTextWarning = styled.div`
  margin: 20px 0;
`

const Container = ({ getChartsByView, fetchSingleView, project, view, chartItems, match }) => {
  const { projectId, viewId } = match.params;
  useEffect(() => {
    getChartsByView(viewId);
    fetchSingleView(viewId);
  }, [viewId]);

  return (
    <Wrapper>
      {project && (
        <React.Fragment>
          <StyledBreadcrumb>
            <Link to="/dashboard">{project.project_name}</Link> 
            <Link to={`/dashboard/${projectId}/views`}> / Views / </Link> 
            {view.view_name} 
          </StyledBreadcrumb>
        </React.Fragment>
      )}
      <ChartTooltip />
      <ChartToolbar />
      {chartItems.length === 0 && <StyledTextWarning>This view doesn't has any chart.</StyledTextWarning>}
      <ChartList />
      <DeleteChartModal />
      <CreateChartModal />
      <AddRemoveModal />
    </Wrapper>
  )
}

const mapStateToProps = state => {
  const { 
    project,
    charts: { charts: { view, chartItems } }
  } = state;

  return {
    project,
    view,
    chartItems
  };
}

const mapDispatchToProps = {
  getChartsByView,
  fetchSingleView,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Container));

