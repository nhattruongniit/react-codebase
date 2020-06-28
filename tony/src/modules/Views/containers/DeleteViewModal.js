import { connect } from 'react-redux';
import DeleteViewModal from '../components/DeleteViewModal';
import { confirmDeleteView, cancelDeleteView } from '../reducers/views';

const mapStateToProps = state => ({
  isShowing: state.views.views.deleteView.isDeleting,
});

const mapDispatchToProps = {
  confirmFn: confirmDeleteView,
  cancelFn: cancelDeleteView,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteViewModal);
