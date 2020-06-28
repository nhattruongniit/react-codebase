import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  border-radius: 6px;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.25);
  border: solid 1px #a3a5a7;
  background-color: #f0f0f0;
  width: 48px;
  position: absolute;
  bottom: 0;
  left: 0;
  cursor: pointer;
  z-index: 100;
`;

const Item = styled.div`
  padding: 2px 5px;
  font-size: 14px;
  line-height: 1.36;
  text-align: left;
  color: #3d3e3e;

  &:hover {
    background: #418cff;
    color: #ffffff;
  }

  ${props => props.active && css`
    background: #418cff;
    color: #ffffff;
  `}
`

const DropdownOverlay = ({
  items,
  onChange,
  value
}) => (
  <Container>
    {items.map(item => (
      <Item active={value === item} key={item} onClick={() => onChange(item)}>{item}</Item>
    ))}
  </Container>
)

export default DropdownOverlay;
