import React from 'react';
import styled from 'styled-components';
import { Button, TextInput } from 'carbon-components-react';
import { Slider } from 'carbon-components-react';

import ActionBar from './ActionBar';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  height: 48px;
  box-sizing: border-box;
  align-items: center;
`;

const AddStyled = styled.div`
  align-self: center;
  &.bx--btn {
    display: flex;
    min-height: 34px;
  }
`;

const ToolbarStyled = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  b {
    font-size: 12px;
    font-weight: bold;
  }
`

const SettingStyled = styled.div`
  .inputSize {
    background-color: #fff;
    width: 40px;
    min-width: 40px;
    padding: 0;
    text-align: center;
  }
`

const LineStyled = styled.div`
  margin-top: 5px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

`

const StyledChange = styled.div`
  margin-bottom: 10px;
  p {
    font-size: 14px;
    display: inline-block;
    margin-right: 10px;
  }
`

const ViewToolbar = (props) => {

  const handleSlider = result => {
    const totalPages = Math.ceil(props.chartItems.length / props.itemsPerPage);
    props.setChartsPerPageFunc(result.value)
    if (props.itemsPerPage + 1 >= totalPages) {
      props.setPageNumberFn(1)  
    } 
  }

  const handleChange = e => {
    props.changeRenderLineChartFn(Number(e.target.value));
  }

  return (
    <>
      {/* <StyledChange>
        <p>Test render line chart: </p>
        <select onChange={handleChange}>
          <option value="5000">Line Chart with CanvasJS (5000 data points)</option>
          <option value="4999">Line Chart with Rechart (4999 data points)</option>
        </select>
      </StyledChange> */}
      <Container>
        <br />
        { props.selectedItemCount === 0 &&
          <> 
            <ToolbarStyled>
              <AddStyled>
                <Button onClick={props.createNewFn}>Add Chart</Button>
              </AddStyled>
              <SettingStyled>
                <b>Number of Charts per Page</b>
                <LineStyled>
                  <Slider
                    min={2}
                    max={12}
                    hideTextInput
                    value={props.itemsPerPage}
                    onChange={handleSlider}
                  />
                  <TextInput
                    id="paging"
                    className="inputSize"
                    labelText=""
                    disabled
                    value={props.itemsPerPage}
                  />
                </LineStyled>
              </SettingStyled>
            </ToolbarStyled>
          </>
        }

        { props.selectedItemCount > 0 &&
          <ActionBar {...props} />
        }
      </Container>
    </>
    
  )
}

export default ViewToolbar;
