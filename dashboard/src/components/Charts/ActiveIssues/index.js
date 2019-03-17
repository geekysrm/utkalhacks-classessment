import React, { Component } from 'react';
import ActiveIssues from './ActiveIssues';
import ClosedIssues from './ClosedIssues';
import OpenIssues from './OpenIssues';
import AllIssues from './AllIssues';
import CloseRate from './CloseRate';
import axios from 'axios';
export default class ActiveIssuesDash extends Component {
  state = {
    students: 0,
    satisfaction: null
  };
  componentDidMount() {
    console.log('Hellooooooo comp');
    axios
      .get('http://localhost:5000/test') // };

      .then(response => {
        // handle success
        console.log(response.data);
        this.setState({
          students: response.data.number_of_students,
          satisfaction: response.data.sum
        });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  render() {
    const { open, closed, active } = this.props;
    const activeCount = open.length + closed.length;
    const bulletData = [
      { target: 70, current: Math.round(this.props.closeRate.average * 100) }
    ];
    let tempPlotBands;
    if (this.state.students) {
      tempPlotBands = [
        {
          from: 0,
          to: this.state.students * 25,
          color: '#04f257',
          opacity: 1
        },
        {
          from: this.state.students * 25,
          to: 100,
          color: '#d10c44',
          opacity: 1
        }
      ];
    }
    // const data = [
    //   {
    //     label: 'Positive',
    //     value: this.state.satisfaction * this.state.
    //   },
    //   { label: 'Negative', value: 3 }
    // ];
    return (
      <div className="card">
        <h5 className="card-header">Today's Attendance</h5>
        <div className="card-body">
          <div className="row">
            {/* <ActiveIssues active={active} count={activeCount} />
            <ClosedIssues closed={closed} />
            <OpenIssues open={open} /> */}
            <CloseRate
              closeRate={this.props.closeRate}
              // bulletData={bulletData}
              // students={this.state.students}
              tempPlotBands={tempPlotBands}
              students={this.state.students}
            />
            <AllIssues
              satisfaction={this.state.satisfaction}
              open={open}
              closed={closed}
            />
          </div>
          <div className="row" />
        </div>
      </div>
    );
  }
}
