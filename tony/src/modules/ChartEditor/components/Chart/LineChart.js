import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const LineChartContainer = ({ chartData, chartOptions, labels }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart
      width={600}
      height={500}
      data={chartData}
      margin={{ top: 50, right: 50, left: 50, bottom: 50 }}
      fill="#fff"
      style={{ background: 'white' }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      {chartOptions && chartOptions.grid && (
        <CartesianGrid strokeDasharray="3 3" />
      )}
      {chartOptions && chartOptions.tooltip && <Tooltip />}
      {chartOptions && chartOptions.legend && <Legend />}
      {Object.keys(labels).map(label => (
        <Line
          type="monotone"
          dataKey={label}
          stroke={labels[label]}
          activeDot={{ r: 8 }}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
);

export default LineChartContainer;
