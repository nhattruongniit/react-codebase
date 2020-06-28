import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { resetDocumentPageState } from '../../reducers/documents';

import DocumentList from './DocumentList';
import FilterBar from './FilterBar';
import Toolbar from './Toolbar';
import CreateDocumentModal from './CreateDocumentModal';
import UpgradeDocumentModal from './UpgradeDocumentModal';
import DeleteDocumentModal from './DeleteDocumentModal';

const Container = styled.div`
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

const DocumentPage = ({ resetDocumentPageState, project, match, ...props }) => {
  useEffect(() => {
    resetDocumentPageState();
  }, []);

  return (
    <Container>
      { project && (
        <React.Fragment>
          <ProjectName><Link to="/dashboard">{project.project_name}</Link> / </ProjectName>
        </React.Fragment>
      )}
      <FilterBar />
      <Toolbar />
      <DocumentList />
      <UpgradeDocumentModal />
      <CreateDocumentModal />
      <DeleteDocumentModal />
    </Container>
  );
}

const mapStateToProps = state => ({
  project: state.project,
});

const mapDispatchToProps = {
  resetDocumentPageState,
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);