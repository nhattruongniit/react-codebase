import React from "react";
import styled from "styled-components";

import Pagination from "carbon-components-react/es/components/Pagination";

const DefaultPage = ({ totalItems, currentPage, perPage, onChangePagination }) => {
  return (
    <PagingStyled>
      <Pagination
        page={currentPage}
        totalItems={totalItems}
        pageSize={perPage}
        pageSizes={[10, 20, 50]}
        onChange={value => onChangePagination(value)}
      />
    </PagingStyled>
  );
};

export default DefaultPage;

const PagingStyled = styled.div`
  margin-top: 30px;
`;