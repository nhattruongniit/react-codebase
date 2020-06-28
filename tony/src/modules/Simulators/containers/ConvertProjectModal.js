import { connect } from 'react-redux';
import ConvertProjectModal from '../components/ConvertProjectModal';

import { setModalConvertSimToProject, convertSimToProject } from '../reducers/convertProjectModal';

const mapStateToProps = state => ({
  isShowing: state.simulators.convertProjectModal.isShowing,
  simulationId: state.simulators.convertProjectModal.simulationId,
  simulationName: state.simulators.convertProjectModal.simulationName
});

const mapDispatchToProps = dispatch => ({
  cancelFn: () => dispatch(setModalConvertSimToProject(null, '', false)),
  convertFn: simulatioId => dispatch(convertSimToProject(simulatioId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConvertProjectModal);
