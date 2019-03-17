import React, { Component } from 'react';
import IssuesTypeChart from './IssuesTypesChart';

class IssuesTypes extends Component {
  didInit = false;
  constructor(props) {
    super(props);

    let sevlow = props.data.find(series => series.type === 'SEV: LOW');

    this.state = {
      value: sevlow.value,
      category: sevlow.type,
      point: {
        options: {
          color: 'rgb(255, 99, 88)'
        }
      },
      donutLabel: sevlow.type,
      donutPercent: Math.round(sevlow.value * 100 || 0) + '%',
      hoverColor: 'rgb(252, 81, 8)'
    };

    this.seriesHover = this.seriesHover.bind(this);
  }

  seriesHover(event) {
    this.setState(event);
  }
  componentWillReceiveProps(props) {
    if (
      props.data.find(series => series.type === this.state.category).value !==
      this.state.value
    ) {
      let sevlow = props.data.find(series => series.type === 'SEV: LOW');
      this.setState({
        value: sevlow.value,
        donutPercent: Math.round(sevlow.value * 100 || 0) + '%'
      });
      this.didInit = true;
    }
  }
  render() {
    return (
      // <div className="card issue-types mt-4">
      //     <h4 className="card-header">Issue Types</h4>
      //     <div className="card-body">
      //         <IssuesTypeChart data={this.props.data} seriesHover={this.seriesHover} />
      //         <div className="comp-label chart-label" style={{ color: this.state.hoverColor }}>
      //             <strong>{this.state.donutPercent}</strong>
      //             <small>{this.state.donutLabel}</small>
      //         </div>
      //     </div>
      // </div>
      null
    );
  }
}

export default IssuesTypes;
