import React, { useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fetchSimulations } from '../reducers/simulators';

import FilterBar from './FilterBar';
import SimulatorToolbar from './SimulatorToolbar';
import SimulatorList from './SimulatorList';
import DeleteModal from './DeleteModal';
import ConvertProjectModal from './ConvertProjectModal';
import ViewLogModal from './ViewLogModal';

const Wrapper = styled.div`
  padding: 50px 100px;
  margin: 0 auto;
  a {
    text-decoration: none;
  }
  .bx--data-table-v2 td:nth-child(2) {
    width: 25%;
  }
  .bx--data-table-v2 td:nth-child(5) {
    width: 18%;
    padding: 10px 30px 10px 0;
  }
  .bx--data-table-v2 td  a div {
    width: 100%;
  }
`;

const ProjectName = styled.div`
  font-size: 14px;
  line-height: 1.29;
  color: #3d70b2;
  margin-bottom: 20px;
`;

const Container = ({ fetchSimulations, project, match, currentPage, perPage }) => {
  const { documentId } = match.params;
  useEffect(() => {
    fetchSimulations(documentId, currentPage, perPage);
  }, []);

  return (
    <Wrapper>
      {project && (
        <React.Fragment>
          <ProjectName><Link to="/dashboard">{project.project_name}</Link> / Simulations / </ProjectName>
        </React.Fragment>
      )}
      <FilterBar />
      <SimulatorToolbar />
      <SimulatorList />
      <DeleteModal />
      <ConvertProjectModal />
      <ViewLogModal />
    </Wrapper>
  )
}

const mapStateToProps = state => {
  const { 
    project,
    simulators: {
      simulators: {
        meta: {
          currentPage,
          perPage
        }
      }
    }
  } = state;

  return {
    project,
    currentPage,
    perPage
  };
}

const mapDispatchToProps = {
  fetchSimulations,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Container));

