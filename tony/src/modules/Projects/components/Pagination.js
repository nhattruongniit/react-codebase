import React from 'react';
import Paging from '../../../components/common/Pagination';

const Pagination = ({ totalItems, fetchProjects, currentPage, perPage, sortDirection }) => {
  const onChangePagination = value => {
    fetchProjects(value.page, value.pageSize, sortDirection)
  }

  return (
    <>
      <Paging totalItems={totalItems} currentPage={currentPage} perPage={perPage} onChangePagination={onChangePagination} />
    </>
  )
}

export default Pagination;