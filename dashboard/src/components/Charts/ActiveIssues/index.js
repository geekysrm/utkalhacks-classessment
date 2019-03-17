import React from 'react';
import ActiveIssues from './ActiveIssues';
import ClosedIssues from './ClosedIssues';
import OpenIssues from './OpenIssues';
import AllIssues from './AllIssues';
import CloseRate from './CloseRate';

const ActiveIssuesDash = props => {
  const { open, closed, active } = props;
  const activeCount = open.length + closed.length;
  const bulletData = [
    { target: 70, current: Math.round(props.closeRate.average * 100) }
  ];

  return (
    <div className="card">
      <h5 className="card-header">This month's Attendance</h5>
      <div className="card-body">
        <div className="row">
          <ActiveIssues active={active} count={activeCount} />
          <ClosedIssues closed={closed} />
          <OpenIssues open={open} />
          <CloseRate closeRate={props.closeRate} bulletData={bulletData} />
          <AllIssues open={open} closed={closed} />
        </div>
        <div className="row" />
      </div>
    </div>
  );
};

export default ActiveIssuesDash;
