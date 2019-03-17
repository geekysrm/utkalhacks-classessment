import React, { Component } from 'react';
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartLegend,
  ChartArea
} from '@progress/kendo-react-charts';
import 'hammerjs';

class IssuesTypesChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: true,
      data: this.props.data
    };
  }

  updateDonutLegend(event) {
    this.setState({
      init: false
    });
    this.props.seriesHover({
      hoverColor: event.point.options.color,
      donutPercent: Math.round(event.value * 100 || 0) + '%',
      donutLabel: event.category
    });
  }

  updateSeries(event) {
    let currentState = this.state.data;
    currentState[event.pointIndex].visible =
      currentState[event.pointIndex].visible === undefined
        ? false
        : !currentState[event.pointIndex].visible;
    this.setState({
      data: currentState,
      init: true
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.init;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    });
  }

  render() {
    const legend = {
      position: 'bottom',
      labels: { font: '0.65em Roboto, Arial, sans-serif' }
    };

    return (
      // <Chart onSeriesHover={this.updateDonutLegend.bind(this)} onLegendItemClick={this.updateSeries.bind(this)} transitions={false}>
      //     <ChartArea background={"white"}/>
      //     <ChartSeries>
      //         <ChartSeriesItem holeSize={120} data={this.state.data} type="donut" field="value" categoryField="type" overlay={false}/>
      //     </ChartSeries>
      //     <ChartLegend {...legend} />
      // </Chart>
      null
    );
  }
}

export default IssuesTypesChart;
