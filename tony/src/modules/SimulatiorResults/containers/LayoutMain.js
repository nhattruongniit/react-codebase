import { connect } from 'react-redux';
import moment from 'moment';

import LayoutMain from '../components/LayoutMain';
import { toggleSelectItem, toggleSelectAllSimulators, clearSelectedItems } from '../reducers/selectedSimulatorsId';
import { setPageNumber, setItemsPerPage } from '../reducers/simulatorPagination';
import { requestDeleteSimulator, setChartName, setAccordion } from '../reducers/simulationResult';
import GridView from '../components/GirdView';
import TableView from '../components/TableView';
import GroupRowFolder from '../components/TableView/GroupRowFolder';
import { SORT_DIRECTION } from '../../../appConstants';
import { setModalSendView } from '../reducers/sendViewModal';
import { fetchSingleFile } from '../reducers/viewLogModal';

const tableHeaders = [
  {
    key: 'path',
    header: 'Name',
  },
  {
    key: 'type',
    header: 'Type',
  },
  {
    key: 'size',
    header: 'Size'
  },
  {
    key: 'created_at',
    header: 'Date Created'
  },
  {
    key: 'create_at',
    header: 'Time Created'
  }
];

const mapStateToProps = state => {
  const { apiBaseUrl } = state.app;
  const { pageNumber, itemsPerPage } = state.simulatorResults.simulatorPagination;
  const { tileSize, layoutType, sortDirection } = state.dashboardOptions;
  const selectedSimulatorsId = state.simulatorResults.selectedSimulatorsId;
  let simulators = state.simulatorResults.simulationResults.simulationResults;
  const keyword = state.simulatorResults.simulationResults.filterKeyword && state.simulatorResults.simulationResults.filterKeyword.toLowerCase();
  const isSelectAll = simulators.length === selectedSimulatorsId.length;
  const isIndeterminateSelectAll = selectedSimulatorsId.length > 0 && !isSelectAll;
  const project = state.project;
  const simulatorId = state.simulators.simulators.simulator.id;
  const isExpand = state.simulatorResults.simulationResults.isExpand
  const hasPagination = true;
  const showOutputFolder = true;
  const noSortable = true;

  if (keyword) {
    simulators = simulators.filter(item => item.chart_name.toLowerCase().indexOf(keyword) !== -1);
  }

  simulators = [...simulators.sort((p1, p2) => {
    const d1 = moment(p1.updated_at).toDate();
    const d2 = moment(p2.updated_at).toDate();
    if (sortDirection === SORT_DIRECTION.DESC) {
      return d2 - d1;
    } else {
      return d1 - d2;
    }
  })];

  const componentProps = {
    tileSize,
    selectedIds: selectedSimulatorsId,
    layoutType,
    isSelectAll,
    isIndeterminateSelectAll,
    gridItemComponent: GridView,
    projectId: project && project.id,
    apiBaseUrl,
    simulatorId,
    hasPagination
  }

  // const startOffset = (pageNumber - 1) * itemsPerPage;
  // const endOffset = startOffset + itemsPerPage;
  // const simulatorsItemByPage = simulators.slice(startOffset, endOffset).map(item => {
  //   if (item.path) {
  //     item.id = item.path;
  //   } 
  //   return item;
  // });
  const simulatorsItemByPage = simulators.map(item => {
    if (item.path) {
      item.id = item.path;
    } 
    return item;
  });
  const totalItems = state.simulatorResults.simulationResults.simulationResults.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const rowHeight = state.dashboardOptions.rowHeight;

  return {
    ...componentProps,
    items: simulatorsItemByPage,
    pageNumber,
    itemsPerPage,
    totalItems,
    totalPages,
    rowHeight,
    isExpand,
    showOutputFolder,
    headers: tableHeaders,
    tableRowComponent: TableView,
    GroupRowFolder,
    apiBaseUrl,
    noSortable
  };
  
};

const mapDispatchToProps = {
  selectItem: toggleSelectItem,
  toggleSelectAll: toggleSelectAllSimulators,
  selectPage: setPageNumber,
  setItemsPerPage,
  setItemName: setChartName,
  deleteFn: requestDeleteSimulator,
  setModalSendViewFn: setModalSendView,
  viewFileFn: fetchSingleFile,
  clearSelectedItemsFn: clearSelectedItems,
  setAccordionFn: setAccordion
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutMain);