import React from 'react';
import styled, { css } from 'styled-components';
import ChevronLeft from '@carbon/icons-react/es/chevron--left/16';
import ChevronRight from '@carbon/icons-react/es/chevron--right/16';

const Container = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  margin: 0 auto;

`;

const PageButton = styled.div`
  border: none;
  border: solid 1px #dfe3e6;
  padding: 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: #5a6872;
  position: relative;
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  cursor: pointer;

  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      color: #5a6872;
    `}

  &:first-child {
    border-right: none;
  }

  &:last-child {
    border-left: none;
  }
`;

const PageNumberButton = styled(PageButton)`
  width: auto;
  border: solid 1px #dfe3e6;
  padding: 0 10px;
`;

const PageNumberText = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.29;
  text-align: left;
  color: #3d70b2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChartPageSelect = ({ pageLabel, pageNumber, totalPages, selectPage }) => {
  const previousPage = () => {
    if (pageNumber > 0) selectPage(pageNumber - 1);
  };

  const nextPage = () => {
    if (pageNumber < totalPages - 1) selectPage(pageNumber + 1);
  };

  return (
    <Container>
      <PageButton disabled={pageNumber === 0} onClick={previousPage}>
        <ChevronLeft />
      </PageButton>
      <PageNumberButton disabled={totalPages <= 0}>
        <PageNumberText>{pageLabel}</PageNumberText>
      </PageNumberButton>
      <PageButton disabled={pageNumber >= totalPages - 1} onClick={nextPage}>
        <ChevronRight />
      </PageButton>
    </Container>
  );
};

export default ChartPageSelect;
