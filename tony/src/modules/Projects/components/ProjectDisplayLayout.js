import React from 'react';
import ProjectGrid from 'components/common/DashboardGrid';
import ProjectTable from 'components/common/DashboardTable/DashboardTableView';
import { PROJECTS_LAYOUT_TYPE } from '../constants';
import Pagination from '../containers/projectDashboard/Pagination';

const ProjectDisplayLayout = ({ layoutType, ...props }) => {
  return (
    <>
      {layoutType === PROJECTS_LAYOUT_TYPE.GRID ? <ProjectGrid {...props} /> : <ProjectTable {...props} />}
      <Pagination />
    </>
    
  )
  
}

export default ProjectDisplayLayout;
