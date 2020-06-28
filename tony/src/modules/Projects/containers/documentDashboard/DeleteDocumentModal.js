import { connect } from 'react-redux';
import DeleteDocumentModal from '../../components/DeleteDocumentModal';
import { confirmDeleteDocument, cancelDeleteDocument } from '../../reducers/documents';

const mapStateToProps = state => ({
  isShowing: state.projects.documents.deleteDocument.isDeleting,
});

const mapDispatchToProps = {
  confirmFn: confirmDeleteDocument,
  cancelFn: cancelDeleteDocument,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDocumentModal);
