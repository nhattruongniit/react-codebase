import { connect } from 'react-redux';
import ViewLogModal from '../components/ViewLogModal';

import { setModalViewLog, viewLogSimulation } from '../reducers/viewLogModal';

const mapStateToProps = state => ({
  isShowing: state.simulators.viewLogModal.isShowing,
  logsErr: state.simulators.viewLogModal.logsErr,
  currentPage: state.simulators.viewLogModal.meta.currentPage,
  simulationId: state.simulators.viewLogModal.simulationId,
  perPage: state.simulators.viewLogModal.meta.perPage,
  totalCount: state.simulators.viewLogModal.meta.totalCount
});

const mapDispatchToProps = dispatch => ({
  cancelFn: () => dispatch(setModalViewLog(false)),
  viewLogFn: (simulation_id, page, per_page, hasMore) => dispatch(viewLogSimulation(simulation_id, page, per_page, hasMore))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewLogModal);
