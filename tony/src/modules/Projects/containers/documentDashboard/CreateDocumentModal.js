import { connect } from 'react-redux';
import { hideCreateIdfDocumentModal, createDocument, createDocumentFromFiles  } from '../../reducers/createDocumentModal';
import CreateDocumentModal from '../../components/CreateDocumentModal';

const mapStateToProps = state => ({
  ...state.projects.createDocumentModal,
});

const mapDispatchToProps = {
  cancelFn: hideCreateIdfDocumentModal,
  createDocumentFn: createDocument,
  createDocumentFromFilesFn: createDocumentFromFiles,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDocumentModal);
