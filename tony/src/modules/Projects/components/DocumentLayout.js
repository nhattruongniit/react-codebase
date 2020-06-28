import React from 'react';
import ProjectGrid from 'components/common/DashboardGrid';
import ProjectTable from 'components/common/DashboardTable/DashboardTableView';

import { DASHBOARD_LAYOUT_TYPE } from 'appConstants';
import Pagination from '../containers/documentDashboard/Pagination';

const ProjectDisplayLayout = ({ layoutType, ...props }) => {
  return (
    <>
      {layoutType === DASHBOARD_LAYOUT_TYPE.GRID ? <ProjectGrid {...props} /> : <ProjectTable {...props} />}
      <Pagination />
    </>
  )
}

export default ProjectDisplayLayout;
