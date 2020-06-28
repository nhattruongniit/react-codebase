import { connect } from 'react-redux';
import moment from 'moment';

import ChartDisplayLayout from '../components/ChartDisplayLayout';
import { toggleSelectChart, toggleSelectAllCharts } from '../reducers/selectedChartId';
import { setPageNumber, setItemsPerPage } from '../reducers/chartPagination';
import { setChartName, requestDeleteChart, setMaximizeChart, duplicateChart, changeRenderLineChart } from '../reducers/charts';
import ChartItem from 'modules/Charts/components/ChartGridItem';

const mapStateToProps = state => {
  const { chartId, isMaximize } = state.charts.charts;
  const { pageNumber, itemsPerPage } = state.charts.chartPagination;
  const { tileSize, layoutType } = state.dashboardOptions;
  const { amountLineChart } = state.charts.charts;
  const selectedChartIds = state.charts.selectedChartIds;
  let charts = state.charts.charts.chartItems;
  const isSelectAll = charts.length === selectedChartIds.length;
  const isIndeterminateSelectAll = selectedChartIds.length > 0 && !isSelectAll;

  charts = [...charts.sort((p1, p2) => {
    const d1 = moment(p1.updated_at).toDate();
    const d2 = moment(p2.updated_at).toDate();
    return d2 - d1;
  })];

  const componentProps = {
    items: charts,
    tileSize, 
    selectedIds: selectedChartIds,
    layoutType,
    isSelectAll,
    isIndeterminateSelectAll,
    listtemComponent: ChartItem,
  }
  
  const startOffset = (pageNumber - 1) * itemsPerPage;
  const endOffset = startOffset + itemsPerPage;
  const viewItemByPage = charts.slice(startOffset, endOffset);
  const totalItems = state.charts.charts.chartItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const itemWidth = itemsPerPage >= 5 ? 23.5 : 48.5;

  return {
    ...componentProps,
    items: viewItemByPage,
    pageNumber,
    itemsPerPage,
    totalItems,
    totalPages,
    itemWidth,
    isMaximize,
    chartId,
    amountLineChart
  };
};

const mapDispatchToProps = {
  selectItem: toggleSelectChart,
  toggleSelectAll: toggleSelectAllCharts,
  selectPage: setPageNumber,
  setItemsPerPage,
  setItemName: setChartName,
  deleteFn: requestDeleteChart,
  setMaximizeChartFn: setMaximizeChart,
  duplicateFn: duplicateChart,
  changeRenderLineChartFn: changeRenderLineChart
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartDisplayLayout);