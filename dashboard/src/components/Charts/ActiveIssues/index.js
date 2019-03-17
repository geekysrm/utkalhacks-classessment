import React, { Component } from 'react';
import ActiveIssues from './ActiveIssues';
import ClosedIssues from './ClosedIssues';
import OpenIssues from './OpenIssues';
import AllIssues from './AllIssues';
import CloseRate from './CloseRate';
import axios from 'axios';
export default class ActiveIssuesDash extends Component {
  componentDidMount() {
    axios
      .get('http://localhost:5000/test')
      .then(response => {
        // handle success
        console.log(response);
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
    return (
      <div className="card">
        <h5 className="card-header">Today's Attendance</h5>
        <div className="card-body">
          <div className="row">
            <ActiveIssues active={active} count={activeCount} />
            <ClosedIssues closed={closed} />
            <OpenIssues open={open} />
            <CloseRate
              closeRate={this.props.closeRate}
              bulletData={bulletData}
            />
            <AllIssues open={open} closed={closed} />
          </div>
          <div className="row" />
        </div>
      </div>
    );
  }
}
