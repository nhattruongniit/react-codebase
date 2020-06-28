import React from 'react';
import ViewGrid from 'components/common/DashboardGrid';
import ViewTable from 'components/common/DashboardTable/DashboardTableView';
import Pagination from '../../../components/common/Pagination/Pagination';
import { DASHBOARD_LAYOUT_TYPE } from 'appConstants';

const ViewDisplayLayout = ({ layoutType, ...props }) => {
  return (
    <>
      {layoutType === DASHBOARD_LAYOUT_TYPE.GRID ? <ViewGrid {...props} /> : <ViewTable {...props} />}
      {/* <Pagination allowSelectPerPage {...props} /> */}
    </>
  )
}

export default ViewDisplayLayout;
