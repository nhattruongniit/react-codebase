import { connect } from 'react-redux';
import IdfObjectPagination from '../../../../components/common/Pagination';
import { selectPage } from '../../reducers/importObjects';

const mapStateToProps = state => {
  const totalPages = Math.ceil(state.importObjects.totalItems / state.importObjects.itemsPerPage);
  return {
    pageNumber: state.importObjects.pageNumber,
    totalPages,
    itemsPerPage: state.importObjects.itemsPerPage,
    totalItems: state.importObjects.totalItems,
  };
};

const mapDispatchToProps = {
  selectPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(IdfObjectPagination);
