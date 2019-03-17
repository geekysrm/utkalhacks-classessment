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

const ActiveIssues = props => {
  const seriesData = props.active;
  const categoryAxis = {
    baseUnit: 'months',
    majorGridLines: { visible: false },
    majorTicks: { visible: false },
    labels: { step: 4, skip: 2, font: '10px sans-serif' },
    line: { visible: false }
  };
  return null;
};

export default ActiveIssues;
