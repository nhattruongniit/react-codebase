import { connect } from 'react-redux';
import SendViewModal from '../components/SendViewModal';

import { closeModalSendView, getAllChartsByView, addChartToView } from '../reducers/sendViewModal';

const mapStateToProps = state => ({
  isShowing: state.simulatorResults.sendViewModal.isShowing,
  views: state.simulatorResults.sendViewModal.views,
  amountChartInView: state.simulatorResults.sendViewModal.amountChartInView,
  chartIds: state.simulatorResults.sendViewModal.chartIds,
  selectedSimulatorsId: state.simulatorResults.selectedSimulatorsId,
  isAddSuccess: state.simulatorResults.sendViewModal.isAddSuccess,
});

const mapDispatchToProps = dispatch => ({
  cancelFn: () => dispatch(closeModalSendView()),
  getAllChartsByViewFn: viewId => dispatch(getAllChartsByView(viewId)),
  addChartToViewFn: (viewId, chartIds) => dispatch(addChartToView(viewId, chartIds))
});

export default connect(mapStateToProps, mapDispatchToProps)(SendViewModal);
