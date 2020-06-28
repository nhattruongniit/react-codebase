import { connect } from 'react-redux';
import { setModalVisibility, addChartsToView, deleteSelectChart, fetchTreeViewData } from '../reducers/createChartModal';
import CreateChartModal from '../components/CreateChartModal'

const mapStateToProps = state => ({
  ...state.charts.createChartModal,
  viewId: state.charts.charts.view.id,
  currentCharts: state.charts.charts.chartItems,
  treeViewData: state.charts.createChartModal.treeViewData,
});

const mapDispatchToProps = dispatch => ({
  cancelFn: () => dispatch(setModalVisibility(false)),
  addChartsToViewFn: (viewId, chartIds, chartCloned, chartOwner) => dispatch(addChartsToView(viewId, chartIds, chartCloned, chartOwner)),
  deleteSelectChartFn: () => dispatch(deleteSelectChart()),
  fetchTreeViewData: item => dispatch(fetchTreeViewData(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateChartModal);
