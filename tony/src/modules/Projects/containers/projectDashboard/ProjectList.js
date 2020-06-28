import { connect } from 'react-redux';

import ProjectDisplayLayout from '../../components/ProjectDisplayLayout';
import { toggleSelectProject, toggleSelectAllProjects } from '../../reducers/selectedProjectIds';
import { setPageNumber, setItemsPerPage } from '../../reducers/projectPagination';
import { setProjectName, duplicateProject, requestDeleteProject, fetchProjects } from '../../reducers/projects';
import { selectProjectAndShowUpgradeDialog } from '../../reducers/upgradeProjectVersion';
import { DASHBOARD_LAYOUT_TYPE } from 'appConstants';
import { getMaxVersionId } from '../../selectors/projects';
import ProjectItem from 'modules/Projects/components/ProjectGridItem';
import ProjectTableRow from 'modules/Projects/components/ProjectTableRow';

const tableHeaders = [
  {
    key: 'project_name',
    header: 'Name'
  },
  {
    key: 'version',
    header: 'IDF Version',
  },
  {
    key: 'idf_documents',
    header: 'IDF Docs',
  },
  {
    key: 'simulations',
    header: 'Simulations',
  },
  {
    key: 'graphs',
    header: 'Graphs',
  },
  {
    key: 'updated_at',
    header: 'Last modified',
  },
];

const mapStateToProps = state => {
  const { pageNumber, itemsPerPage } = state.projects.projectPagination;
  const { tileSize, layoutType } = state.dashboardOptions;
  const selectedProjectIds = state.projects.selectedProjectIds;
  let projects = state.projects.projects.projectItems;
  // const filterKeyword = state.projects.projects.filterKeyword && state.projects.projects.filterKeyword.toLowerCase();
  const isSelectAll = projects.length === selectedProjectIds.length;
  const isIndeterminateSelectAll = selectedProjectIds.length > 0 && !isSelectAll;

  // if (keyword) {
  //   projects = projects.filter(project => project.project_name.toLowerCase().indexOf(keyword) !== -1);
  // }

  // projects = [...projects.sort((p1, p2) => {
  //   const d1 = moment(p1.updated_at).toDate();
  //   const d2 = moment(p2.updated_at).toDate();
  //   if (sortDirection === SORT_DIRECTION.DESC) {
  //     return d1 - d2;
  //   } else {
  //     return d2 - d1;
  //   }
  // })];

  const componentProps = {
    items: projects,
    tileSize,
    selectedIds: selectedProjectIds,
    layoutType,
    isSelectAll,
    isIndeterminateSelectAll,
    gridItemComponent: ProjectItem,
    maxIdfVersion: getMaxVersionId(state),
  }

  if (layoutType === DASHBOARD_LAYOUT_TYPE.GRID) {
    return componentProps;
  }

  const totalItems = state.projects.projects.projectItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const rowHeight = state.dashboardOptions.rowHeight;

  return {
    ...componentProps,
    items: projects,
    pageNumber,
    itemsPerPage,
    totalItems,
    totalPages,
    rowHeight,
    headers: tableHeaders,
    tableRowComponent: ProjectTableRow,
  };
};

const mapDispatchToProps = {
  selectItem: toggleSelectProject,
  toggleSelectAll: toggleSelectAllProjects,
  selectPage: setPageNumber,
  setItemsPerPage,
  setItemName: setProjectName,
  deleteFn: requestDeleteProject,
  duplicateFn: duplicateProject,
  upgradeFn: selectProjectAndShowUpgradeDialog,
  fetchProjects
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDisplayLayout);