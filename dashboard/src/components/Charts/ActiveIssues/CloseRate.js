import React from 'react';
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem
} from '@progress/kendo-react-charts';

const CloseRate = props => {
  const formatp = number => {
    return Intl.NumberFormat(navigator.language, { style: 'percent' }).format(
      number
    );
  };

  const formatd = date => {
    if (!date) {
      return '';
    }
    return new Date(parseInt(date, 10)).toDateString();
  };

  const closeRatePlotBands = [{ from: 0, to: 100, color: '#35C473' }];

  const hidden = { visible: false };
  const temp = [[25, 22]];
  if (props && props.tempPlotBands)
    return (
      <div>
        <div className="col-12 col-lg-6 col-xl pb-4 close-rate">
          <span className="comp-label">
            <strong>{props.students * 25 + '%'}</strong>
            <small>Present</small>
          </span>
          <p className="m-0 small text-uppercase text-muted">
            Highest: {formatp(props.closeRate.highest.close_rate)}
            on {formatd(props.closeRate.highest.created_at)}
          </p>
          <p className="m-0 small text-uppercase text-muted">
            Lowest:
            {formatp(props.closeRate.lowest.close_rate)}
            on {formatd(props.closeRate.lowest.created_at)}
          </p>

          <Chart style={{ height: 120 }}>
            <ChartSeries>
              <ChartSeriesItem type="bullet" color="#04f257" data={temp} />
            </ChartSeries>
            <ChartCategoryAxis>
              <ChartCategoryAxisItem
                majorGridLines={hidden}
                minorGridLines={hidden}
              />
            </ChartCategoryAxis>
            <ChartValueAxis>
              <ChartValueAxisItem
                majorGridLines={hidden}
                minorTicks={hidden}
                min={0}
                max={100}
                plotBands={props.tempPlotBands}
              />
            </ChartValueAxis>
          </Chart>
        </div>
      </div>
    );
  else return <div>Loading...</div>;
};

export default CloseRate;
