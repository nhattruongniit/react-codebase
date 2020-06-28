import { connect } from 'react-redux';
import Pagination from '../../components/Pagination';

import { fetchProjects } from '../../reducers/projects';

const mapStateToProps = state => ({
  totalItems: state.projects.projects.meta.totalItems,
  currentPage: state.projects.projects.meta.currentPage,
  perPage: state.projects.projects.meta.perPage,
  sortDirection: state.dashboardOptions.sortDirection
});

const mapDispatchToProps = {
  fetchProjects
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
