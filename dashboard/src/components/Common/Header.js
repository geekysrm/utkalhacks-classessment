import React, { Component } from 'react';
import { ButtonGroup, Button } from '@progress/kendo-react-buttons';

class Header extends Component {
    static periods = ["3", "6", "12"];

    changePeriod = (e) => {
        let months = e.target.value;
        this.props.onPeriodChange({ period: months });
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm mb-4">
                    <h5>
                        <span className="small text-uppercase text-muted d-block">{this.props.name}</span>
                        {[this.props.range.from.toDateString(), ' - ', this.props.range.to.toDateString()]}
                    </h5>
                </div>
                <div className="col-sm text-sm-right mb-4">
                    <ButtonGroup>
                        {
                            Header.periods.map(p => <Button
                                key={p} value={p}
                                selected={this.props.period === p}
                                togglable={true}
                                onClick={this.changePeriod}
                            >{`${p} Months`}
                            </Button>)
                        }
                    </ButtonGroup>
                </div>
            </div>
        );
    };
}

export default Header;
