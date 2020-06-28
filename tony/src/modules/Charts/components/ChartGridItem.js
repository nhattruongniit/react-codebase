import React, { createRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import  MinimizeIcon from '@carbon/icons-react/es/minimize/16';

import Overlay from './Overlay';
import EditableName from 'components/common/DashboardGrid/EditableName';

import BarChart from './ReCharts/BarChart';
import PieChart from './ReCharts/PieChart';
import RadarChar from './ReCharts/RadarChart';
import LineChart from './ReCharts/LineChart';
import LineCanvasChart from './ReCharts/LineCanvasChart';

import dataLineCanvasChart from './ReCharts/mocks/dataLineCanvasChart';
import dataLineReChart from './ReCharts/mocks/dataLineChart';

const ChartDetailsContainer = styled.div`
  padding: ${props => props.isLineChart ? '35px 10px 10px 10px;' : '10px' };
  height: 460px;
  background-color: #fff;
  font-size: 12px;
  .overlay {
    display: none;
    background-color: #f00;
  }
  .overlay.block {
    display: block;
  }
  .overlay.hidden {
    display: none
  }
  :hover {
    .overlay {
      display: block;
    }
  }
`;

const NameContainer = styled.div`
  overflow: hidden;
  flex-grow: 1;
  margin-bottom: 10px;
`;


const ButtonWrapper = styled.div`
  cursor: pointer;
  fill: #5596E6;
  position: absolute;
  right: 15px;
  z-index: 3;
  top: 10px;
`;

const StyledContent = styled.div`
  ${props => props.hasMaximize && css`
    &::after {
      content: '';
      position: fixed;
      z-index: 2;
      width: 100%;
      height: 100%;
      top: 0;
      left:0;
      background-color: #000;
      opacity: 0.3;
    }
  `}
`

const StyledChart = styled.div`
  height: 100%;
  ${props => props.hasMaximize && css`
    position: fixed;
    top: 53%;
    left: 60%;
    width: 90%;
    height: 85%;
    z-index: 3;
    transform: translate(-60%, -50%);
    background-color: #fff;
    padding: 30px 0;
    .overlay {
      display: none !important;
    }
  `}
  .canvasjs-chart-canvas {
    height: 400px !important;
  }
`

const StyledCanvasJS = styled.div` 
  .canvasjs-chart-credit {
    display: none;
  }
  ${props => props.hasMaximize && css`
    padding: 0 10px;
    .canvasjs-chart-canvas {
      height: 70vh !important;
    }
  `}
`

const ChartGridItem = ({
  item,
  isSelected,
  selectItem,
  size,
  setItemName,
  isMaximize,
  setMaximizeChartFn,
  chartId,
  amountLineChart,
  changeRenderLineChartFn,
  ...props
}) => {
  const [widthPanel, setWidthPanel] = useState(0);
  const editableNameRef = React.useRef();
  const hasMaximize = isMaximize && item.id === chartId;
  const dataLineChart =  amountLineChart >= 5000 ? dataLineCanvasChart : dataLineReChart;
  const refPanel = createRef();

  useEffect(() => {
    if (refPanel.current.clientWidth > refPanel.current.clientHeight) {
      setWidthPanel(refPanel.current.clientHeight);
    } else {
      setWidthPanel(refPanel.current.clientWidth);
    }
  }, [])

  function onRequestRename() {
    editableNameRef.current.editName();
  }

  const renderLineChart = () => {
    if (item.type === 'line') {
      return (
        <>
          {amountLineChart >= 5000 ? (
            <>
              <StyledCanvasJS hasMaximize={hasMaximize} >
                <LineCanvasChart dataLineChart={dataLineChart} hasMaximize={hasMaximize} />
              </StyledCanvasJS>
            </>
          ) : 
          (
            <LineChart dataLineChart={dataLineChart} hasMaximize={hasMaximize}  />
          )}
        </>
      )
    }
  }

  const changeCanvasJS = () => {
    changeRenderLineChartFn(5000)
  }

  const changeReChart = () => {
    changeRenderLineChartFn(4999)
  }

  return (
    <StyledContent hasMaximize={hasMaximize} ref={refPanel}>
      <NameContainer>
        <EditableName
          name={item.chart_name}
          onNameChange={name => setItemName(item.id, name, item.parent_simulation_id, item.type, item.options)}
          ref={editableNameRef}
        />
      </NameContainer>
      <ChartDetailsContainer isLineChart={item.type === 'line'}>
          <StyledChart hasMaximize={hasMaximize} >
            <div className={`overlay ${isSelected ? 'block' : 'hidden'}`}>
              <Overlay
                id={item.id}
                isSelected={isSelected}
                onToggleSelected={selectItem}
                onRequestRename={onRequestRename}
                setMaximizeChartFn={setMaximizeChartFn}
                changeCanvasJS={changeCanvasJS}
                changeReChart={changeReChart}
                isLineChart={item.type === 'line'}
                amountLineChart={amountLineChart}
                {...props}
              />
            </div>
            { hasMaximize && (
              <ButtonWrapper onClick={() => setMaximizeChartFn(item.id, false)}>
                <MinimizeIcon width={20} height={20} />
              </ButtonWrapper>
            )}

            {item.type === 'bar' && <BarChart />}
            {item.type === 'pie' && <PieChart hasMaximize={hasMaximize} widthPanel={widthPanel} />}
            {item.type === 'radar' && <RadarChar hasMaximize={hasMaximize} widthPanel={widthPanel} />}
            {renderLineChart()}
          </StyledChart>
      </ChartDetailsContainer>
    </StyledContent>
  )
}

export default ChartGridItem;
