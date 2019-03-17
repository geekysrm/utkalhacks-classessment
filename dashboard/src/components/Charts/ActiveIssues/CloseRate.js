import React from 'react';
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartArea,
  ChartTitle,
  ChartTooltip,
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
  const tooltipRender = ({ point }) => {
    const { value } = point;

    return (
      <span>
        Maximum: {value.target}
        <br />
        Average: {value.current}
      </span>
    );
  };
  const tempPlotBands = [
    {
      from: 0,
      to: 65,
      color: '#04f257',
      opacity: 1
    },
    {
      from: 65,
      to: 100,
      color: '#d10c44',
      opacity: 1
    }
  ];
  return (
    <div>
      <div className="col-12 col-lg-6 col-xl pb-4 close-rate">
        <span className="comp-label">
          <strong>{'65%'}</strong>
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
        {/* <Chart style={{ height: '30px', marginLeft: '-15px' }}>
          <ChartArea background={'white'} />
          <ChartSeries>
            <ChartSeriesItem
              data={props.bulletData}
              gap={0}
              type="bullet"
              currentField="current"
              targetField="target"
              color="#CC3458"
              target={{ color: '#FFF' }}
            />
          </ChartSeries>
          <ChartValueAxis>
            <ChartValueAxisItem
              narrowRange={false}
              plotBands={closeRatePlotBands}
              visible={false}
              color="#CC3458"
              majorGridLines={{ visible: false }}
            />
          </ChartValueAxis>
        </Chart> */}
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
              plotBands={tempPlotBands}
            />
          </ChartValueAxis>
        </Chart>
      </div>
    </div>
  );
};

export default CloseRate;
