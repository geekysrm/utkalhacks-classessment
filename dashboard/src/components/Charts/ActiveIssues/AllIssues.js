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

const AllIssues = props => {
  const categoryAxis = {
    baseUnit: 'months',
    majorTicks: { visible: false },
    majorGridLines: { visible: false },
    labels: { rotation: 'auto', margin: { top: 8 } },
    line: { visible: false }
  };

  const valueAxis = {
    line: { visible: false },
    labels: { step: 2, skip: 2, margin: { right: 4 } },
    majorGridLines: { step: 2, skip: 2, color: '#F0F2F2' }
  };
  const data = [
    {
      label: 'Positive',
      value: 7
    },
    { label: 'Negative', value: 3 }
  ];
  return (
    <div className="col-sm-12">
      <h5>Effectiveness of Classroom Teaching</h5>
      <Chart>
        {/* <ChartArea background={"white"}/>
                <ChartSeries>
                    <ChartSeriesItem data={props.open} type="column" field="count" categoryField="date" aggregate="count" stack={true} opacity={0.3} gap={0.06} overlay={false} color={"#35C473"} border={"color: '#35C473', opacicty: 0.3"}/>
                    <ChartSeriesItem data={props.closed} type="column" field="count" categoryField="date" aggregate="count" stack={true} opacity={0.3} gap={0.06} overlay={false} color={"#CC3458"} border={"color: '#CC3458', opacicty: 0.3"}/>
                </ChartSeries>
                <ChartCategoryAxis>
                    <ChartCategoryAxisItem {...categoryAxis}/>
                </ChartCategoryAxis>
                <ChartValueAxis>
                    <ChartValueAxisItem {...valueAxis}/>
                </ChartValueAxis> */}
        <ChartArea background="#eee" margin={30} />
        <ChartSeries>
          <ChartSeriesItem
            data={data}
            field="value"
            name="Teaching Effectiveness"
            categoryField="label"
          />
        </ChartSeries>
      </Chart>
    </div>
  );
};

export default AllIssues;
