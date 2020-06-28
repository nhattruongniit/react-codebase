import React from 'react';
import {
  PolarGrid,
  RadarChart,
  Radar,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const RadarChartContainer = ({ chartData, chartOptions, labels }) => (
  <ResponsiveContainer width="100%" height="100%">
    <RadarChart
      width={600}
      height={500}
      data={chartData}
      margin={{ top: 50, right: 50, left: 50, bottom: 50 }}
      fill="#fff"
      style={{ background: 'white' }}
    >
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={30} domain={[0, 150]} />
      {chartOptions && chartOptions.grid && (
        <CartesianGrid strokeDasharray="3 3" />
      )}
      {chartOptions && chartOptions.tooltip && <Tooltip />}
      {chartOptions && chartOptions.legend && <Legend />}
      {Object.keys(labels).map(label => (
        <Radar name={label} dataKey={label} stroke={labels[label]} fill={labels[label]} fillOpacity={0.6} />
      ))}
    </RadarChart>
  </ResponsiveContainer>
);

export default RadarChartContainer;
