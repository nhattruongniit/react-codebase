import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowCollapse from 'components/common/Svg/ArrowCollapse';
import ArrowExpand from 'components/common/Svg/ArrowExpand';
import { Checkbox } from 'carbon-components-react';

const Container = styled.div`
  overflow-y: auto;
  height: 230px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  cursor: pointer;
  border-top: 1px solid #DFE3E6;
  padding: 10px 0;
  font: 16px/24px IBM Plex Sans;

  .bx--form-item.bx--checkbox-wrapper {
    margin-top: 0;
  }

  .bx--form-item {
    flex-grow: 1;
  }
  .bx--checkbox-label {
    width: 100%;
  }
`;

const ToggleWrapper = styled.div`
  width: 18px;
`;

const Label = styled.div`
  font-size: 0.9rem;
`;

const LoadMoreButton = styled.div`
  margin-bottom: 8px;
  cursor: pointer;
  font-size: 0.9rem;
`;

const TreeView = ({ treeData, onExpand, onSelectItems }) => {
  const [activeItems, setActiveItems] = useState({});
  const [checkedItems, setCheckedItems] = useState([]);

  function toggleActiveItem(item) {
    const key = item.key;
    if (activeItems[key]) {
      delete activeItems[key];
    } else {
      activeItems[key] = true;
      if (onExpand && item.canExpand) onExpand(item);
    }
    setActiveItems({ ...activeItems });
  }

  function toggleCheckedItem(item) {
    const existed = checkedItems.some(val => val.id === item.id);

    if(existed) {
      const index = checkedItems.findIndex(val => val.id === item.id);
      checkedItems.splice(index, 1);
    } else {
      checkedItems.push(item);
    }
    setCheckedItems([ ...checkedItems ]);
    onSelectItems(checkedItems);
  }

  function renderItem(item, level = 0) {
    const paddingLeft = level * 15;
    if (item.items) {
      return (
        <React.Fragment key={item.key}>
          <ItemWrapper
            style={{ paddingLeft }}
            key={item.key}
            onClick={() => toggleActiveItem(item)}
          >
            <ToggleWrapper>
              {activeItems[item.key] ? <ArrowExpand /> : <ArrowCollapse />}
            </ToggleWrapper>
            <Label>{item.label}</Label>
          </ItemWrapper>

          {activeItems[item.key] && (
            <>
              {item.items
                .filter(itemKey => treeData[itemKey])
                .map(itemKey => renderItem(treeData[itemKey], level + 1))}

              {item.pagination && item.pagination.loadMore === true && (
                <LoadMoreButton
                  style={{ paddingLeft: paddingLeft + 14 }}
                  onClick={() => onExpand(item)}
                >
                  Load more
                </LoadMoreButton>
              )}
            </>
          )}
        </React.Fragment>
      );
    } else {
      return (
        <ItemWrapper style={{ paddingLeft }} key={item.key}>
          <Checkbox
            id={item.key}
            checked={checkedItems.findIndex(checkedItem => checkedItem.key === item.key) !== -1}
            labelText={item.label}
            onChange={() => toggleCheckedItem(item)}
          />
        </ItemWrapper>
      );
    }
  }

  const topItems = Object.keys(treeData)
    .map(key => treeData[key])
    .filter(item => item.root);

  return <Container>{topItems.map(item => renderItem(item, 0))}</Container>;
};

export default TreeView;
