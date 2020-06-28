import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search } from 'carbon-components-react';
import TileSizeSelect from './TileSizeSelect';
import LayoutSelect from './LayoutSelect';
import { DASHBOARD_LAYOUT_TYPE } from 'appConstants';
import RowHeightSelect from './RowHeightSelect';

// hooks
import useDebounce from 'hooks/useDebounce';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 35px;
  align-items: center;
`;

const StyledSearchbox = styled(Search)`
  width: 200px;

  .bx--search-input {
    background: white;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.29;
    letter-spacing: normal;
    text-align: left;
    color: #5a6872;
    height: 32px;
  }
`;

const LeftContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PopupWrapper = styled.div`
  margin-right: 75px;
`;

const FilterBar = ({
  setFilterKeyword,
  setTileSize,
  setLayoutType,
  tileSize,
  layoutType,
  rowHeight,
  setRowHeight,
  disableSearch,
}) => {
  const [text, setText] = useState('');
  const debounceVal = useDebounce(text);
  useEffect(() => {
    setFilterKeyword(text)
  }, [debounceVal])

  return (
    <Container>
      {disableSearch ? <div/> : (
        <StyledSearchbox
          placeHolderText="Search"
          labelText="Search"
          onChange={e => setText(e.target.value)}
        />
      )}
      <LeftContent>
        <PopupWrapper>
          { layoutType === DASHBOARD_LAYOUT_TYPE.GRID &&
            <TileSizeSelect setTileSize={setTileSize} tileSize={tileSize} />
          }
          { layoutType === DASHBOARD_LAYOUT_TYPE.TABLE &&
            <RowHeightSelect setRowHeight={setRowHeight} rowHeight={rowHeight} />
          }
        </PopupWrapper>
        <LayoutSelect setLayoutType={setLayoutType} layoutType={layoutType} />
      </LeftContent>
    </Container>
  )
}

export default FilterBar;
