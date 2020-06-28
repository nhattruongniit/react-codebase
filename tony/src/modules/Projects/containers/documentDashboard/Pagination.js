import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DocumentPagination from '../../components/DocumentPagination';

import { fetchDocuments } from '../../reducers/documents';

const mapStateToProps = state => ({
  totalItems: state.projects.documents.meta.totalItems,
  currentPage: state.projects.documents.meta.currentPage,
  perPage: state.projects.documents.meta.perPage,
});

const mapDispatchToProps = {
  fetchDocuments
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DocumentPagination));

