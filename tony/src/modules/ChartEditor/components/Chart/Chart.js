import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import ChartPageSelect from './ChartPageSelect';
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';

const Container = styled.div`
  background-color: #fff;
  padding: 10px;
  width: 100%;
  height: 100%;
`;

const ChartContainer = styled.div`
  margin-bottom: 10px;
  width: ${props => props.width || 600}px;
  height: ${props => props.height || 500}px;
`;

const PageSelectContainer = styled.div`
  margin: 0 auto;
`;

const Chart = ({
  data,
  selectPage,
  totalPages,
  pageNumber,
  pageLabel,
  chartOptions,
  chart,
  labels,
  plottedType
}) => {
  const containerRef = useRef();
  const [chartContainerSize, setChartContainerSize] = useState(null);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight - 80;
      setChartContainerSize({
        width,
        height
      });
    }
  }, [data]);

  if (!data) return <div>Your chart will be displayed at here</div>;

  return (
    <Container ref={containerRef} id="chart">
      {chartContainerSize && (
        <>
          <ChartContainer
            width={chartContainerSize.width}
            height={chartContainerSize.height}
          >
            {chart.type === 'line' && (
              <LineChart
                chartData={data.chartData}
                chartOptions={chartOptions}
                labels={labels}
              />
            )}
            {chart.type === 'bar' && (
              <BarChart
                chartData={data.chartData}
                chartOptions={chartOptions}
                labels={labels}
              />
            )}
            {chart.type === 'pie' && (
              <PieChart
                chartData={data.chartData}
                chartOptions={chartOptions}
                labels={labels}
                plottedType={plottedType}
              />
            )}
          </ChartContainer>
          <PageSelectContainer>
            <ChartPageSelect
              totalPages={totalPages}
              selectPage={selectPage}
              pageNumber={pageNumber}
              pageLabel={pageLabel}
            />
          </PageSelectContainer>
        </>
      )}
    </Container>
  );
};

export default Chart;
