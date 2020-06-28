import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowDownIcon from '@carbon/icons-react/es/caret--down/16';
import DropdownOverlay from './DropdownOverlay';

const Container = styled.div`
  display: flex;
  position: relative;
  font-size: 12px;
  line-height: 1.5;
  text-align: left;
  color: #5a6872;
  padding-left: 20px;
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.29;
  text-align: left;
  color: #3d70b2;
  align-items: center;
  cursor: pointer;
  margin-right: 5px;
`;

const ItemsPerPageSelect = ({
  itemsPerPage,
  setItemsPerPage,
  totalItems,
  pageNumber,
  allowSelectPerPage
}) => {
  const startOffset = (pageNumber - 1) * itemsPerPage + 1;
  let endOffset = startOffset + itemsPerPage - 1;
  if (endOffset > totalItems) endOffset = totalItems;
  const [isShowingDropdown, setIsShowingDropdown] = useState(false);
  const toggleDropdown = () => {
    if (isShowingDropdown) {
      setIsShowingDropdown(false)
    } else {
      setIsShowingDropdown(true)
    }
  }

  return (
    <Container>
      Items per page:
      <DropdownWrapper style={{ marginLeft: 5 }}>
        <DropdownWrapper onClick={toggleDropdown}>
          {itemsPerPage}
          {allowSelectPerPage && <ArrowDownIcon />}
        </DropdownWrapper>
        { isShowingDropdown && allowSelectPerPage &&
          <DropdownOverlay
            items={[10, 20, 50]}
            onChange={value => {
              setItemsPerPage(value);
              setIsShowingDropdown(false);
            }}
            value={itemsPerPage}
          />
        }
      </DropdownWrapper> | { startOffset} - { endOffset } of {totalItems} items
    </Container>
  );
}

export default ItemsPerPageSelect;
