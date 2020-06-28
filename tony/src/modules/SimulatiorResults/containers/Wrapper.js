import React, { useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fetchSingleSimulation } from '../../Simulators/reducers/simulators';
import { fetchFileSimulation } from '../reducers/simulationResult';

import FilterBar from './FilterBar';
import SimulatorToolbar from './Toolbar';
import SimulatorList from './LayoutMain';
import DeleteModal from './DeleteModal';
import CreateNewModal from './CreateNewModal';
import SendViewModal from './SendViewModal';
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

const Container = ({ fetchSingleSimulation, fetchFileSimulation, project, simulation_name, match }) => {
  const { projectId, documentId, simulatorId } = match.params;
  useEffect(() => {
    fetchSingleSimulation(simulatorId)
    fetchFileSimulation(simulatorId)
  }, []);

  return (
    <Wrapper>
      {project && (
        <React.Fragment>
          <ProjectName>
            <Link to="/dashboard">{project.project_name}</Link> 
            <Link to={`/dashboard/${projectId}/documents/${documentId}/simulator/`}> / Simulations / </Link>
            {simulation_name} / Results
          </ProjectName>
        </React.Fragment> 
      )}
      <FilterBar />
      <SimulatorToolbar />
      <SimulatorList />
      <DeleteModal />
      <CreateNewModal />
      <SendViewModal />
      <ViewLogModal />
    </Wrapper>
  )
}

const mapStateToProps = state => {
  const { 
    project,
    simulators: {
      simulators: {
        simulator: {
          simulation_name
        }
      }
    }
  } = state;

  return {
    project,
    simulation_name,
  };
}

const mapDispatchToProps = {
  fetchSingleSimulation,
  fetchFileSimulation,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Container));

