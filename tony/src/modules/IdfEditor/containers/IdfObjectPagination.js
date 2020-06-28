import { connect } from 'react-redux';
import Pagination from '../../../components/common/Pagination';
import { selectPage } from '../reducers/idfObjects';

const mapStateToProps = state => {
  const totalPages = Math.ceil(state.idfObjects.totalItems / state.idfObjects.itemsPerPage);
  return {
    pageNumber: state.idfObjects.pageNumber,
    totalPages,
    itemsPerPage: state.idfObjects.itemsPerPage,
    totalItems: state.idfObjects.totalItems,
  };
};

const mapDispatchToProps = {
  selectPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
