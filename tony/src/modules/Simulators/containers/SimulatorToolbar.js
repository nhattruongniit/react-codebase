import { connect } from 'react-redux';
import SimulatorToolbar from '../components/SimulatorToolbar';

import { clearSelectedItems } from '../reducers/selectedSimulatorsId';
import { requestDeleteSelectedSimulators, downloadSelectedSimulations } from '../reducers/simulators';
import { toggleSortDirection } from 'reducers/dashboardOptions';
import { setModalConvertSimToProject } from '../reducers/convertProjectModal';

const mapStateToProps = state => ({
  selectedItemCount: state.simulators.selectedSimulatorsId.length,
  sortDirection: state.dashboardOptions.sortDirection,
  selectedSimulatorsId: state.simulators.selectedSimulatorsId,
  simulatorItems: state.simulators.simulators.simulatorItems,
  apiBaseUrl: state.app.apiBaseUrl
});

const mapDispatchToProps = dispatch => ({
  clearSelectedItems: () => dispatch(clearSelectedItems()),
  deleteFn: () => dispatch(requestDeleteSelectedSimulators()),
  toggleSortDirection: () => dispatch(toggleSortDirection()),
  downloadFn: apiBaseUrl => dispatch(downloadSelectedSimulations(apiBaseUrl)),
  setModalConvertFn: (simulationId, simulationName, showing) => dispatch(setModalConvertSimToProject(simulationId, simulationName, showing))
});

export default connect(mapStateToProps, mapDispatchToProps)(SimulatorToolbar);
