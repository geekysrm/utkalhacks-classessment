import React from 'react';

import { Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartValueAxis,
    ChartValueAxisItem,
    ChartArea } from '@progress/kendo-react-charts';

const ActiveIssues = (props) => {
    const seriesData =  props.active;
    const categoryAxis = { baseUnit: 'months', majorGridLines: {visible: false}, majorTicks: { visible: false  }, labels: { step: 4, skip: 2, font: '10px sans-serif' }, line: { visible: false } };
    return (
        <div className="col-sm-12 col-md-6 col-lg active-issues" >
            <span className="comp-label">
                <strong>{ props.count }</strong>
                <small>Active issues</small>
            </span>
            <Chart style={{ height: '80px' }}>
                <ChartArea background={"white"}/>
                <ChartSeries>
                  <ChartSeriesItem data={seriesData} type="column" field="count" categoryField="date" aggregate="count" stack={true} gap={0.5} overlay={false} color="#888"/>
                </ChartSeries>
                <ChartCategoryAxis>
                    <ChartCategoryAxisItem {...categoryAxis}/>
                </ChartCategoryAxis>
                <ChartValueAxis>
                    <ChartValueAxisItem visible={false}  majorGridLines={{ visible: false }}/>
                </ChartValueAxis>
            </Chart>
        </div>
    );
}

export default ActiveIssues;