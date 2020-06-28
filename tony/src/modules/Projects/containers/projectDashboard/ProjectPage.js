import React from 'react';
import styled from 'styled-components';

import FilterBar from './FilterBar';
import Toolbar from './Toolbar';
import ProjectList from './ProjectList';
import UpgradeProjectModal from './UpgradeProjectModal';
import CreateProjectModal from './CreateProjectModal';
import DeleteProjectModal from './DeleteProjectModal';

const Wrapper = styled.div`
  padding: 50px 100px;
  margin: 0 auto;
`;

const Container = () => {
  return (
    <Wrapper>
      <FilterBar />
      <Toolbar />
      <ProjectList />
      <UpgradeProjectModal />
      <CreateProjectModal />
      <DeleteProjectModal />
    </Wrapper>
  );
};

export default Container;
