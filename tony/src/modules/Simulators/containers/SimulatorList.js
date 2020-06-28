import { connect } from 'react-redux';
import moment from 'moment';

import SimulatorDisplayLayout from '../components/SimulatorDisplayLayout';
import { toggleSelectItem, toggleSelectAllSimulators } from '../reducers/selectedSimulatorsId';
import { setPageNumber, setItemsPerPage } from '../reducers/simulatorPagination';
import { setViewName, requestDeleteSimulator, downloadSimulations, duplicateSimulation } from '../reducers/simulators';
import { DASHBOARD_LAYOUT_TYPE } from 'appConstants';
import SimulatorItem from 'modules/Simulators/components/SimulatorGridItem';
import SimulatorTableRow from 'modules/Simulators/components/SimulatorTableRow';
import { SORT_DIRECTION } from '../../../appConstants';
import { setModalConvertSimToProject } from '../reducers/convertProjectModal';
import { viewLogSimulation } from '../reducers/viewLogModal';

const tableHeaders = [
  {
    key: 'simulation_name',
    header: 'Name'
  },
  {
    key: 'created_date',
    header: 'Date Created'
  },
  {
    key: 'estimated',
    header: 'Estimated',
  },
  {
    key: 'Log',
    header: 'Log',
  },
  {
    key: 'Size',
    header: 'Size',
  },
  {
    key: 'status',
    header: 'Status'
  }
];

const mapStateToProps = state => {
  const { apiBaseUrl } = state.app;
  const { pageNumber, itemsPerPage } = state.simulators.simulatorPagination;
  const { tileSize, layoutType, sortDirection } = state.dashboardOptions;
  const selectedSimulatorsId = state.simulators.selectedSimulatorsId;
  let simulators = state.simulators.simulators.simulatorItems;
  const keyword = state.simulators.simulators.filterKeyword && state.simulators.simulators.filterKeyword.toLowerCase();
  const isSelectAll = simulators.length === selectedSimulatorsId.length;
  const isIndeterminateSelectAll = selectedSimulatorsId.length > 0 && !isSelectAll;
  const project = state.project;
  const { totalPage, perPage, currentPage } = state.simulators.viewLogModal.meta;

  if (keyword) {
    simulators = simulators.filter(item => item.simulation_name.toLowerCase().indexOf(keyword) !== -1);
  }

  simulators = [...simulators.sort((p1, p2) => {
    const d1 = moment(p1.updated_at).toDate();
    const d2 = moment(p2.updated_at).toDate();
    if (sortDirection === SORT_DIRECTION.DESC) {
      return d1 - d2;
    } else {
      return d2 - d1;
    }
  })];

  const componentProps = {
    items: simulators,
    tileSize,
    selectedIds: selectedSimulatorsId,
    layoutType,
    isSelectAll,
    isIndeterminateSelectAll,
    gridItemComponent: SimulatorItem,
    projectId: project && project.id,
    apiBaseUrl,
  }

  if (layoutType === DASHBOARD_LAYOUT_TYPE.GRID) {
    return componentProps;
  }

  const totalItems = state.simulators.simulators.simulatorItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const rowHeight = state.dashboardOptions.rowHeight;

  return {
    ...componentProps,
    items: simulators,
    pageNumber,
    itemsPerPage,
    totalItems,
    totalPages,
    rowHeight,
    totalPage, 
    perPage, 
    currentPage,
    headers: tableHeaders,
    tableRowComponent: SimulatorTableRow,
    apiBaseUrl,
  };
  
};

const mapDispatchToProps = {
  selectItem: toggleSelectItem,
  toggleSelectAll: toggleSelectAllSimulators,
  selectPage: setPageNumber,
  setItemsPerPage,
  setItemName: setViewName,
  deleteFn: requestDeleteSimulator,
  downloadFn: downloadSimulations,
  setModalConvertFn: setModalConvertSimToProject,
  viewLogFn: viewLogSimulation,
  duplicateSimulationFn: duplicateSimulation
}

export default connect(mapStateToProps, mapDispatchToProps)(SimulatorDisplayLayout);