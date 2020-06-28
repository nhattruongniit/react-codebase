import React from 'react';
import styled from 'styled-components';
import PopoverButton from '../PopoverButton';
import SettingIcon from '@carbon/icons-react/es/settings/16';
import { RadioButton } from 'carbon-components-react';
import { DASHBOARD_TABLE_ROW_HEIGHT } from 'appConstants';

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #152935;
  margin-bottom: 13px;
`;

const StyledRadioButton = styled(RadioButton)`
  color: #152935;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Content = styled.div`
  padding: 16px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
`;

const RowHeightSelect = ({
  setRowHeight,
  rowHeight,
}) => (
  <PopoverButton
    icon={<SettingIcon width="18" fill="#5596e6" />}
    content={(
      <Content>
        <Title>Row height</Title>
        <StyledRadioButton
          name="row-height"
          id="row-height-short"
          labelText="Short"
          value={DASHBOARD_TABLE_ROW_HEIGHT.SHORT}
          checked={rowHeight === DASHBOARD_TABLE_ROW_HEIGHT.SHORT}
          onChange={actions => setRowHeight(actions)}
        />
        <StyledRadioButton
          name="row-height"
          id="row-height-tall"
          labelText="Tall"
          value={DASHBOARD_TABLE_ROW_HEIGHT.TALL}
          checked={rowHeight === DASHBOARD_TABLE_ROW_HEIGHT.TALL}
          onChange={actions => setRowHeight(actions)}
        />
      </Content>
    )}
  />
);

export default RowHeightSelect;

