import React from 'react';
import styled from 'styled-components';
import { Slider } from 'carbon-components-react';
import PopoverButton from '../PopoverButton';
import SettingIcon from '@carbon/icons-react/es/settings/16';

const StyledSettingIcon = styled(SettingIcon)`
  fill: #5596e6;
`;

const Content = styled.div`
  padding: 15px 20px 20px 20px;

  .bx--slider__range-label {
    display: none;
  }

  .bx--slider-container {
    margin-top: 15px;
  }
`

const TileSizeSelect = ({
  setTileSize,
  tileSize,
}) => (
  <PopoverButton
    icon={<StyledSettingIcon width="18" />}
    width="265px"
    height="87px"
    content={(
      <Content>
        <Slider
          min={2}
          max={6}
          hideTextInput
          minLabel=""
          maxLabel=""
          labelText="Tile size"
          value={tileSize}
          onChange={result => setTileSize(result.value)}
        />
      </Content>
    )}
  />
);

export default TileSizeSelect;

