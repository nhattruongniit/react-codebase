import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'carbon-components-react';
import canvg from 'canvg';

const Container = styled.div``;

const MenuItem = styled.div`
  padding: 5px 10px;
`;

const Separator = styled.div`
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
`;

function downloadChart() {
  const chart = document.querySelector('.recharts-wrapper');
  if (!chart) return;
  const chartHtml = chart.innerHTML;
  const canvasElement = document.createElement('canvas');
  canvasElement.id = 'canvas';
  document.getElementById('root').appendChild(canvasElement);
  canvg('canvas', chartHtml);
  const link = document.createElement('a');
  link.download = 'chart.png';
  link.href = canvasElement.toDataURL("image/png");
  link.click();
  setTimeout(() => {
    canvasElement.remove();
  });
}

const TabItemPopover = ({ tabId, options, setTabOption }) => {
  function toggleGrid(e) {
    e.stopPropagation();
    const value = options.grid ? false : true;
    setTabOption(tabId, 'grid', value);
  }

  function toggleTooltip(e) {
    e.stopPropagation();
    const value = options.tooltip ? false : true;
    setTabOption(tabId, 'tooltip', value);
  }

  function toggleLegend(e) {
    e.stopPropagation();
    const value = options.legend ? false : true;
    setTabOption(tabId, 'legend', value);
  }

  return (
    <Container>
      <MenuItem>Send to View</MenuItem>
      <MenuItem onClick={downloadChart}>Export</MenuItem>
      <Separator />
      <MenuItem>
        <Checkbox
          id={`toggle-chart-grid-${tabId}`}
          labelText="Grid"
          checked={options.grid}
          onClick={toggleGrid}
        />
      </MenuItem>
      <MenuItem>
        <Checkbox
          id={`toggle-chart-tooltip-${tabId}`}
          labelText="Tooltip"
          checked={options.tooltip}
          onClick={toggleTooltip}
        />
      </MenuItem>
      <MenuItem>
        <Checkbox
          id={`toggle-chart-legend-${tabId}`}
          labelText="Legend"
          checked={options.legend}
          onClick={toggleLegend}
        />
      </MenuItem>
    </Container>
  );
};

export default TabItemPopover;