import React from 'react';
import styled, { css } from 'styled-components';

export const TableContextMenu = styled.div`
  display: block;
  border: 1px solid #dde2e6;
`;

export const MenuItem = styled.div`
  display: block;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  color: #152934;
  padding: 0 16px;
  cursor: pointer;

  &:hover {
    background-color: rgba(85, 150, 230, 0.1);
  }

  ${props => props.disabled && css`
    color: #e6e6e657;
    fill: #e6e6e657;
    cursor: not-allowed;
  `}
`;

export default TableContextMenu;

