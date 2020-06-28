import React from 'react';
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer
} from 'recharts';

const BarChartContainer = ({ chartData, chartOptions, labels }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart
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
        <Bar dataKey={label} fill={labels[label]} />
      ))}
    </BarChart>
  </ResponsiveContainer>
);

export default BarChartContainer;
