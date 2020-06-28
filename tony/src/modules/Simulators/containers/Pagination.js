import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Pagination from '../components/Pagination';

import { fetchSimulations } from '../reducers/simulators';

const mapStateToProps = state => ({
  totalItems: state.simulators.simulators.meta.totalItems,
  currentPage: state.simulators.simulators.meta.currentPage,
  perPage: state.simulators.simulators.meta.perPage,
});

const mapDispatchToProps = {
  fetchSimulations
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Pagination));
