import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Pagination from '../components/Pagination';

import { getAllViewsByProjectId } from '../reducers/views';

const mapStateToProps = state => ({
  totalItems: state.views.views.meta.totalItems,
  currentPage: state.views.views.meta.currentPage,
  perPage: state.views.views.meta.perPage,
});

const mapDispatchToProps = {
  getAllViewsByProjectId
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Pagination));
