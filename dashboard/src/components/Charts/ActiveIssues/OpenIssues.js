import React from 'react';
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartArea
} from '@progress/kendo-react-charts';

const ClosedIssues = props => {
  const seriesData = props.open;
  const categoryAxis = {
    baseUnit: 'months',
    majorGridLines: { visible: false },
    majorTicks: { visible: false },
    labels: { step: 4, skip: 2, font: '10px sans-serif' },
    line: { visible: false }
  };
  return null;
};

export default ClosedIssues;
