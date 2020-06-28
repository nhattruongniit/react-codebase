import React from 'react';
import Paging from '../../../components/common/Pagination';

const Pagination = ({ totalItems, fetchDocuments, currentPage, perPage, match }) => {
  const onChangePagination = value => {
    const { projectId } = match.params;
    fetchDocuments(projectId, value.page, value.pageSize)
  }

  return (
    <>
      <Paging totalItems={totalItems} currentPage={currentPage} perPage={perPage} onChangePagination={onChangePagination} />
    </>
  )
}

export default Pagination;