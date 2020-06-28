import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import SettingIcon from '@carbon/icons-react/es/settings/20';
import { RadioButton } from 'carbon-components-react';

import PopoverButton from '../PopoverButton';

const WrapperStyled = styled.div`
  margin-right: 15px;
`

const BoxStyled = styled.div`
`

const LabelStyled = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #152935;
  margin-bottom: 10px;
`

const StyledRadioButton = styled(RadioButton)`
  .bx--radio-button__label {
    justify-content: flex-start;
  }
  .bx--radio-button__appearance {
    width: 1rem;
    height: 1rem;
  }
`;

const ContentStyled = styled.div`
  padding: 16px 16px 20px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 4px 8px #0000001A;
`;

const RowStyled = styled.div`
  & + & {
    margin-top: 10px;
  }
  .bx--radio-button-wrapper {
    margin-right: 0;
  }
  .bx--radio-button-wrapper + .bx--radio-button-wrapper {
    padding-top: 10px;
  }
`

const ButtonStyled = styled.button`
  display: block;
  border: none;
  font-size: 13px;
  width: 100%;
  text-align: left;
  padding: 0 0 0 5px;
  &+& {
    margin-top: 5px;
  }
`

const SizeButtonStyled = styled.button`
  border: 0;
  outline: 0;
  cursor: pointer;

  ${props => props.disabledTall && css `
    cursor: not-allowed;
    opacity: 0.5;
  `}

  ${props => props.disabledShort && css `
    cursor: not-allowed;
    opacity: 0.5;
  `}
`

const SizeStyled = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px

  span {
    cursor: default;
    display: inline-block;
    &+& {
      margin-left: 5px;
    }
  }
  ${props => props.noAction && css`
    cursor: not-allowed;
    opacity: 0.5;
    ${SizeButtonStyled} {
      cursor: not-allowed;
    }
  `}
`

const  SortStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  &+& {
    margin-top: 10px;
  }
`

const DefaultPage = ({height, setControlSizeFn}) => {
  const [typeRow, setTypeRow] = useState('tall');
  const [disabledTall, setDisabledTall] = useState(true);
  const [disabledShort, setDisabledShort] = useState(true);
  const defaultHeight = 58;
  const defaultFontSize = 14;

  const onChangeTypeRow = (value) => {
    setDisabledShort(true);
    setDisabledTall(true);
    setTypeRow(value)
  }

  const handleIncreaseShort = () => {
    const newHeight = height - 5;
    const newFontSize = newHeight * defaultFontSize / defaultHeight;

    if(height === defaultHeight - 25) {
      setDisabledShort(false);
    } else {
      setControlSizeFn(typeRow, newHeight, newFontSize)
    }
  }

  const handleDescreaseShort = () => {
    const newHeight = height + 5;
    const newFontSize = newHeight * defaultFontSize / defaultHeight;

    if(height === defaultHeight) {
      setDisabledShort(true);
    } else {
      setControlSizeFn(typeRow, newHeight, newFontSize)
    }
  }

  const handleIncreaseTall = () => {
    const newHeight = height + 5;
    const newFontSize = newHeight * defaultFontSize / defaultHeight;

    if(height === defaultHeight + 25) {
      setDisabledTall(false);
    } else {
      setControlSizeFn(typeRow, newHeight, newFontSize)
    }
  }

  const handleDescreaseTall = () => {
    const newHeight = height - 5;
    const newFontSize = newHeight * defaultFontSize / defaultHeight;

    if(height === defaultHeight) {
      setDisabledTall(true);
    } else {
      setControlSizeFn(typeRow, newHeight, newFontSize)
    }

  }

  const renderContent = () => {
    return (
      <ContentStyled>
        <RowStyled>
          <LabelStyled> Row Height </LabelStyled>
          <SortStyled>
            <StyledRadioButton
              name="row-height"
              labelText="Short"
              value="short"
              onChange={value => onChangeTypeRow(value)}
            />
            <SizeStyled noAction={typeRow !== 'short'}>
              <SizeButtonStyled type="button" disabledShort={!disabledShort} onClick={handleIncreaseShort}> + </SizeButtonStyled>
              <span> | </span>
              <SizeButtonStyled type="button" disabledShort={disabledShort} onClick={handleDescreaseShort}> - </SizeButtonStyled>
            </SizeStyled>
          </SortStyled>
          <SortStyled>
            <StyledRadioButton
              defaultChecked
              name="row-height"
              labelText="Tall"
              value="tall"
              onChange={value => onChangeTypeRow(value)}
            />
            <SizeStyled noAction={typeRow !== 'tall'}>
              <SizeButtonStyled type="button" disabledTall={!disabledTall} onClick={handleIncreaseTall}> + </SizeButtonStyled>
              <span> | </span>
              <SizeButtonStyled type="button" disabledTall={disabledTall} onClick={handleDescreaseTall}> - </SizeButtonStyled>
            </SizeStyled>
          </SortStyled>
        </RowStyled>
        {/* <RowStyled>
          <LabelStyled> Scale </LabelStyled>
          <ButtonStyled type="button">Increase</ButtonStyled>
          <ButtonStyled type="button">Decrease</ButtonStyled>
        </RowStyled>
        <RowStyled>
          <LabelStyled> Text </LabelStyled>
          <ButtonStyled type="button">Increase</ButtonStyled>
          <ButtonStyled type="button">Decrease</ButtonStyled>
        </RowStyled> */}
      </ContentStyled>
    )
  }

  return (
    <WrapperStyled>
      <BoxStyled>
        <PopoverButton
          icon={<SettingIcon fill="#5596e6" />}
          popoverWidth="180px"
          content={renderContent()}
        />
      </BoxStyled>
    </WrapperStyled>
  )
};

export default DefaultPage;