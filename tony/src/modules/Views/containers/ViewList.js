import { connect } from 'react-redux';
import moment from 'moment';

import ViewDisplayLayout from '../components/ViewDisplayLayout';
import { toggleSelectView, toggleSelectAllViews } from '../reducers/selectedViewId';
import { setPageNumber, setItemsPerPage } from '../reducers/viewPagination';
import { setViewName, requestDeleteView, duplicateView } from '../reducers/views';
import { DASHBOARD_LAYOUT_TYPE } from 'appConstants';
import ViewItem from 'modules/Views/components/ViewGridItem';
import ViewTableRow from 'modules/Views/components/ViewTableRow';
import { SORT_DIRECTION } from '../../../appConstants';

const tableHeaders = [
  {
    key: 'view_name',
    header: 'Name'
  },
  {
    key: 'charts',
    header: 'Charts',
  },
  {
    key: 'Sims',
    header: 'Sims',
  },
  {
    key: 'updated_at',
    header: 'Last modified',
  },
];

const mapStateToProps = state => {
  const { pageNumber, itemsPerPage } = state.views.viewPagination;
  const { tileSize, layoutType, sortDirection } = state.dashboardOptions;
  const selectedViewIds = state.views.selectedViewIds;
  let views = state.views.views.viewItems;
  const keyword = state.views.views.filterKeyword && state.views.views.filterKeyword.toLowerCase();
  const isSelectAll = views.length === selectedViewIds.length;
  const isIndeterminateSelectAll = selectedViewIds.length > 0 && !isSelectAll;
  const project = state.project;

  if (keyword) {
    views = views.filter(item => item.view_name.toLowerCase().indexOf(keyword) !== -1);
  }

  views = [...views.sort((p1, p2) => {
    const d1 = moment(p1.updated_at).toDate();
    const d2 = moment(p2.updated_at).toDate();
    if (sortDirection === SORT_DIRECTION.DESC) {
      return d1 - d2;
    } else {
      return d2 - d1;
    }
  })];

  const componentProps = {
    items: views,
    tileSize,
    selectedIds: selectedViewIds,
    layoutType,
    isSelectAll,
    isIndeterminateSelectAll,
    gridItemComponent: ViewItem,
    projectId: project && project.id,
  }

  if (layoutType === DASHBOARD_LAYOUT_TYPE.GRID) {
    return componentProps;
  }

  const startOffset = (pageNumber - 1) * itemsPerPage;
  const endOffset = startOffset + itemsPerPage;
  const viewItemByPage = views.slice(startOffset, endOffset);
  const totalItems = state.views.views.viewItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const rowHeight = state.dashboardOptions.rowHeight;

  return {
    ...componentProps,
    items: viewItemByPage,
    pageNumber,
    itemsPerPage,
    totalItems,
    totalPages,
    rowHeight,
    headers: tableHeaders,
    tableRowComponent: ViewTableRow,
  };
};

const mapDispatchToProps = {
  selectItem: toggleSelectView,
  toggleSelectAll: toggleSelectAllViews,
  selectPage: setPageNumber,
  setItemsPerPage,
  setItemName: setViewName,
  deleteFn: requestDeleteView,
  duplicateViewFn: duplicateView
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewDisplayLayout);