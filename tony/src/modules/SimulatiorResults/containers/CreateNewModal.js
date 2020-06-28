import { connect } from 'react-redux';
import CreateNewModal from '../components/CreateNewModal';

import { setModalVisibility, createNewChart } from '../reducers/createNewModal';

const mapStateToProps = state => ({
  isShowing: state.simulatorResults.createNewModal.isShowing,
  simulatorId: state.simulators.simulators.simulator.id
});

const mapDispatchToProps = dispatch => ({
  cancelFn: () => dispatch(setModalVisibility(false)),
  createNewChartFn: (chart_name, parent_simulation_id, type, options) => dispatch(createNewChart(chart_name, parent_simulation_id, type, options))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewModal);
