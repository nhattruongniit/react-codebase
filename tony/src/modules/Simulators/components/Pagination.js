import React from 'react';
import Paging from '../../../components/common/Pagination';

const Pagination = ({ totalItems, fetchSimulations, currentPage, perPage, match }) => {
  const onChangePagination = value => {
    const { documentId } = match.params;
    fetchSimulations(documentId, value.page, value.pageSize)
  }

  return (
    <>
      <Paging totalItems={totalItems} currentPage={currentPage} perPage={perPage} onChangePagination={onChangePagination} />
    </>
  )
}

export default Pagination;