import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import Pagination from '../Pagination/Pagination';

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &::after {
    content: "";
    flex: auto;
  }
`;

const ItemWrapper = styled.div`
  width: ${({ itemWidth }) => itemWidth}%;
  box-sizing: border-box;
  position: relative;
  margin: 0.7%;
  margin-bottom: 50px;
`;

const DashboardGrid = ({
  items,
  selectedIds,
  listtemComponent,
  itemWidth,
  ...props
}) => {
  const ListItem = listtemComponent;
  const isItemSelected = projectId => selectedIds && selectedIds.indexOf(projectId) !== -1;

  return (
    <>
      <StyledContainer>
        {items.map((item, key) => {
          return (
            <ItemWrapper key={key} itemWidth={itemWidth}>
              <ListItem
                item={item}
                isSelected={isItemSelected(item.id)}
                {...props}
              />
            </ItemWrapper>
          )
        })}
      </StyledContainer>
      <Pagination allowSelectPerPage={false} {...props} />
    </>
  );
}

export default DashboardGrid;
