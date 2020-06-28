import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowCollapse from 'components/common/Svg/ArrowCollapse';
import ArrowExpand from 'components/common/Svg/ArrowExpand';
import { Checkbox } from 'carbon-components-react';

const Container = styled.div``;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;

  .bx--form-item.bx--checkbox-wrapper {
    margin-top: 0;
  }

  .bx--form-item {
    flex-grow: 1;
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

const MultiLevelTree = ({ treeData, onExpand, onSelectItem }) => {
  const [activeItems, setActiveItems] = useState({});
  const [checkedItem, setCheckedItem] = useState(null);

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
    setCheckedItem(item.key);
    onSelectItem(item);
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
              {activeItems[item.key] ? <ArrowCollapse /> : <ArrowExpand />}
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
        <ItemWrapper style={{ paddingLeft, marginTop: 10 }} key={item.key}>
          <Checkbox
            id={item.key}
            checked={item.key === checkedItem}
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

export default MultiLevelTree;
