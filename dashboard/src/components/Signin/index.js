import React, { Component } from 'react';

class Dashboard extends Component {
    login = () => {
        this.props.history.push('dashboard');
    }
    render() {
        return (
            <div className="signin" id="signin">
                <div className="signin-form p-5">
                    <h1 id="app-title">ISSUES</h1>
                    <p id="app-subtitle">SAMPLE DASHBOARD</p>
                    <div className="form-group mt-4">
                        <input type="text" className="form-control" placeholder="Email or Username" />
                    </div>
                    <div className="form-group mb-4">
                        <input type="password" className="form-control" placeholder="Password" />
                        <p className="text-xs-right small">
                        <a>Forgot it?</a>
                    </p>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" onClick={this.login}>Log in</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
