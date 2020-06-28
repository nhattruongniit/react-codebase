import { connect } from 'react-redux';
import { addChartsToView, selectChart, deleteSelectChart } from '../reducers/createChartModal';
import AddRemoveModal from '../components/AddRemoveModal'
import { fetchSimulatorsByDocument, fetchChartsBySim } from 'modules/Views/reducers/createViewModal';
import { setModalAddRemove } from '../reducers/addRemoveModal';


const mapStateToProps = state => ({
  ...state.charts.createChartModal,
  viewId: state.charts.charts.view.id,
  documents: state.projects.documents.documentItems,
  simulators: state.views.createViewModal.simulators,
  charts: state.views.createViewModal.charts,
  selectCharts: state.charts.createChartModal.selectCharts,
  currentCharts: state.charts.charts.chartItems,
  isShowingResult: state.charts.addRemoveModal.isShowingResult
});

const mapDispatchToProps = dispatch => ({
  cancelFn: () => dispatch(setModalAddRemove(false)),
  getSimsByDocumentFn: documentId => dispatch(fetchSimulatorsByDocument(documentId)),
  getChartsBySimFn: simId => dispatch(fetchChartsBySim(simId)),
  addChartsToViewFn: (viewId, chartIds) => dispatch(addChartsToView(viewId, chartIds)),
  selectChartFn: (isCheck, id) => dispatch(selectChart(isCheck, id)),
  deleteSelectChartFn: () => dispatch(deleteSelectChart())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRemoveModal);
