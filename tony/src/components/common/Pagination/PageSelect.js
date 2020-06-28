import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ChevronLeft from '@carbon/icons-react/es/chevron--left/16';
import ChevronRight from '@carbon/icons-react/es/chevron--right/16';
import ArrowDownIcon from '@carbon/icons-react/es/caret--down/16';
import DropdownOverlay from './DropdownOverlay';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const TotalPageText = styled.div`
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: right;
  color: #5a6872;
  margin-right: 10px;
`;

const PageButton = styled.div`
  border: none;
  border-left: solid 1px #dfe3e6;
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

  ${props => props.disabled && css`
    cursor: not-allowed;
    color: #5a6872;
  `}
`;

const PageNumberButton = styled(PageButton)`
  width: 55px;
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

const PageSelect = ({
  pageNumber,
  totalPages,
  selectPage,
}) => {
  const [isShowingDropdown, setIsShowingDropdown] = useState(false);
  const pagesArray = Array.from({ length: totalPages }, (value, index) => index + 1);
  const toggleDropdown = () => {
    if (totalPages <= 1) return;
    if (isShowingDropdown) {
      setIsShowingDropdown(false);
    } else {
      setIsShowingDropdown(true);
    }
  };
  const onPageSelect = page => {
    selectPage(page);
    setIsShowingDropdown(false);
  };

  const previousPage = () => {
    if (pageNumber > 1) selectPage(pageNumber - 1);
  }

  const nextPage = () => {
    if (pageNumber < totalPages) selectPage(pageNumber + 1);
  }

  return (
    <Container>
      <TotalPageText>{pageNumber} of {totalPages} pages</TotalPageText>
      <PageButton disabled={pageNumber === 1} onClick={previousPage}>
        <ChevronLeft />
      </PageButton>
      <PageNumberButton disabled={totalPages <= 1} onClick={toggleDropdown}>
        <PageNumberText>
          {pageNumber} <ArrowDownIcon />

          { isShowingDropdown &&
            <DropdownOverlay
              items={pagesArray}
              onChange={onPageSelect}
              value={pageNumber}
            />
          }
        </PageNumberText>
      </PageNumberButton>
      <PageButton disabled={pageNumber >= totalPages} onClick={nextPage}>
        <ChevronRight />
      </PageButton>
    </Container>
  );
}

export default PageSelect;
