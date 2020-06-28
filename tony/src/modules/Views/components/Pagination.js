import React from 'react';
import Paging from '../../../components/common/Pagination';

const Pagination = ({ totalItems, getAllViewsByProjectId, currentPage, perPage, match }) => {
  const onChangePagination = value => {
    const { projectId } = match.params;
    getAllViewsByProjectId(projectId, value.page, value.pageSize)
  }

  return (
    <>
      <Paging totalItems={totalItems} currentPage={currentPage} perPage={perPage} onChangePagination={onChangePagination} />
    </>
  )
}

export default Pagination;