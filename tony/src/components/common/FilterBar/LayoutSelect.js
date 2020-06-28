import React from 'react';
import styled, { css } from 'styled-components';
import GridIcon from '@carbon/icons-react/es/grid/16';
import ListIcon from '@carbon/icons-react/es/list/32';
import { DASHBOARD_LAYOUT_TYPE } from 'appConstants';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  margin-right: 14px;
  fill: #5a6872;
  cursor: pointer;

  ${props => props.active && css`
    fill: #5596e6;
  `}

  &:last-child {
    margin-right: 0;
  }
`;

const LayoutSelect = ({
  layoutType,
  setLayoutType,
}) => (
  <Container>
    <Button
      active={layoutType === DASHBOARD_LAYOUT_TYPE.GRID}
      onClick={() => setLayoutType(DASHBOARD_LAYOUT_TYPE.GRID)}
    >
      <GridIcon width="18" height="18" />
    </Button>
    <Button
      active={layoutType === DASHBOARD_LAYOUT_TYPE.TABLE}
      onClick={() => setLayoutType(DASHBOARD_LAYOUT_TYPE.TABLE)}
    >
      <ListIcon width="18" height="18" />
    </Button>
  </Container>
);

export default LayoutSelect;



