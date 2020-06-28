import { connect } from 'react-redux';
import DeleteModal from '../components/DeleteModal';
import { confirmDeleteSimulator, cancelDeleteSimulator } from '../reducers/simulationResult';

const mapStateToProps = state => ({
  isShowing: state.simulatorResults.simulationResults.deleteSimulator.isDeleting,
});

const mapDispatchToProps = {
  confirmFn: confirmDeleteSimulator,
  cancelFn: cancelDeleteSimulator,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);
