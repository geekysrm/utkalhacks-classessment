import React from 'react';
import ActiveIssuesDash from './../Charts/ActiveIssues';
import IssuesTypes from './../Charts/IssuesTypes';
import TypesDistribution from './../Charts/TypesDistribution';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';

class Statistics extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected: 0
        }
    }
    handleSelect = (e) => {
        this.setState({selected: e.selected})
    }
    render() {
     return (
        <TabStrip selected={this.state.selected} onSelect={this.handleSelect} animation={false}>
            <TabStripTab title="All Issues">
                <div className="row">
                    <div className="col-md-12">
                        <ActiveIssuesDash
                        {...this.props}
                        />
                    </div>
                    <div className="col-md-4">
                        <IssuesTypes data={this.props.issuesTypes} />
                    </div>
                    <div className="col-md-8">
                        <TypesDistribution data={this.props.typesDistribution} months="months" />
                    </div>
                </div>
            </TabStripTab>
            <TabStripTab title="Assigned to Me">
                <div className="row">
                    <div className="col-md-12">
                        <ActiveIssuesDash
                        {...this.props}
                        />
                    </div>
                    <div className="col-md-4">
                        <IssuesTypes data={this.props.issuesTypes} />
                    </div>
                    <div className="col-md-8">
                        <TypesDistribution data={this.props.typesDistribution} months="months" />
                    </div>
                </div>
            </TabStripTab>
            <TabStripTab title="Created by Me">
                <div className="row">
                    <div className="col-md-12">
                        <ActiveIssuesDash
                        {...this.props}
                        />
                    </div>
                    <div className="col-md-4">
                        <IssuesTypes data={this.props.issuesTypes} />
                    </div>
                    <div className="col-md-8">
                        <TypesDistribution data={this.props.typesDistribution} months="months" />
                    </div>
                </div>
            </TabStripTab>
        </TabStrip>
    );
  }
}

export default Statistics;
