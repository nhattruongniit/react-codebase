import { connect } from 'react-redux';
import DeleteModal from '../components/DeleteModal';
import { confirmDeleteSimulator, cancelDeleteSimulator } from '../reducers/simulators';

const mapStateToProps = state => ({
  isShowing: state.simulators.simulators.deleteSimulator.isDeleting,
});

const mapDispatchToProps = {
  confirmFn: confirmDeleteSimulator,
  cancelFn: cancelDeleteSimulator,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);
