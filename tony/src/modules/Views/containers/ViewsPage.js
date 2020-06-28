import React, { useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getAllViewsByProjectId } from '../reducers/views';

import FilterBar from './FilterBar';
import ViewToolbar from './ViewToolbar';
import ViewList from './ViewList';
import DeleteViewModal from './DeleteViewModal';
import CreateViewModal from './CreateViewModal';

const Wrapper = styled.div`
  padding: 50px 100px;
  margin: 0 auto;
  a {
    text-decoration: none;
  }
`;

const ProjectName = styled.div`
  font-size: 14px;
  line-height: 1.29;
  color: #3d70b2;
  margin-bottom: 20px;
`;

const Container = ({ getAllViewsByProjectId, project, currentPage, perPage, match }) => {
  const { projectId } = match.params;
  useEffect(() => {
    getAllViewsByProjectId(projectId, currentPage, perPage);
  }, []);

  return (
    <Wrapper>
      {project && (
        <React.Fragment>
          <ProjectName><Link to="/dashboard">{project.project_name}</Link> / Views / </ProjectName>
        </React.Fragment>
      )}
      <FilterBar />
      <ViewToolbar />
      <ViewList />
      <DeleteViewModal />
      <CreateViewModal />
    </Wrapper>
  )
}

const mapStateToProps = state => {
  const { 
    project,
    views: {
      views: {
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
  getAllViewsByProjectId,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Container));

