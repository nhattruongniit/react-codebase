import React from 'react';
import {
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Pie,
  ResponsiveContainer,
  Cell
} from 'recharts';

const BarChartContainer = ({
  plottedType,
  chartData,
  chartOptions,
  labels
}) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart
      width={600}
      height={500}
      margin={{ top: 50, right: 50, left: 50, bottom: 50 }}
      fill="#fff"
      style={{ background: 'white' }}
    >
      {chartOptions && chartOptions.tooltip && <Tooltip />}
      {chartOptions && chartOptions.legend && <Legend /> }

      {plottedType === 'single' && (
        <Pie data={chartData} dataKey="value" outerRadius={80}>
          {chartData.map((value, index) => (
            <Cell key={`cell-${index}`} fill={labels[value.name]} />
          ))}
        </Pie>
      )}

      {plottedType === 'group' && (
        <Pie
          data={chartData.outerData}
          dataKey="value"
          outerRadius={65}
        >
          {chartData.outerData.map((value, index) => (
            <Cell key={`cell-inner-${index}`} fill={labels[value.name]} />
          ))}
        </Pie>
      )}


      {plottedType === 'group' && (
        <Pie data={chartData.innerData} dataKey="value" innerRadius={80} outerRadius={100} label>
          {chartData.innerData.map((value, index) => (
            <Cell key={`cell-ounter-${index}`} fill={labels[value.name]} />
          ))}
        </Pie>
      )}

    </PieChart>
  </ResponsiveContainer>
);

export default BarChartContainer;
