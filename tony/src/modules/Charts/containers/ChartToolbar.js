import { connect } from 'react-redux';
import ChartToolbar from '../components/ChartToolbar';

import { clearSelectedCharts } from '../reducers/selectedChartId';
import { allowAddChart } from '../reducers/createChartModal';
import { requestDeleteSelectedCharts, duplicateSelectedChart, changeRenderLineChart } from '../reducers/charts';
import { setItemsPerPage, setPageNumber} from '../reducers/chartPagination';
import { setModalAddRemove } from '../reducers/addRemoveModal';

const mapStateToProps = state => ({
  selectedItemCount: state.charts.selectedChartIds.length,
  sortDirection: state.dashboardOptions.sortDirection,
  itemsPerPage: state.charts.chartPagination.itemsPerPage,
  chartItems: state.charts.charts.chartItems
});

const mapDispatchToProps = dispatch => ({
  clearSelectedItems: () => dispatch(clearSelectedCharts()),
  createNewFn: () => dispatch(allowAddChart()),
  deleteFn: () => dispatch(requestDeleteSelectedCharts()),
  setChartsPerPageFunc: numberChart => dispatch(setItemsPerPage(numberChart)),
  duplicateFn: () => dispatch(duplicateSelectedChart()),
  showAddRemoveModalFn: isShowing => dispatch(setModalAddRemove(isShowing)),
  setPageNumberFn: pageNumber => dispatch(setPageNumber(pageNumber)),
  changeRenderLineChartFn: data => dispatch(changeRenderLineChart(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartToolbar);
