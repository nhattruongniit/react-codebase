import React from 'react';
import ViewGrid from 'components/common/DashboardGrid';
import ViewTable from 'components/common/DashboardTable/DashboardTableView';
import { DASHBOARD_LAYOUT_TYPE } from 'appConstants';
import Pagination from '../containers/Pagination';

const ViewDisplayLayout = ({ layoutType, ...props }) => {
  return (
    <>
      {layoutType === DASHBOARD_LAYOUT_TYPE.GRID ? <ViewGrid {...props} /> : <ViewTable {...props} />}
      <Pagination />
    </>
  )
  
  
}

export default ViewDisplayLayout;
