import React, { Component } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { Popup } from '@progress/kendo-react-popup';
import { Switch } from '@progress/kendo-react-inputs';
import Overlay from '../Common/Overlay'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAskDelete: false,
            showProfileUpdate: false,
            isWithOverlay: false
        }

        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onUpdateClick = this.onUpdateClick.bind(this);
    }

    componentDidMount() {
        let url = this.props.gitUserApiUrl;
        let options = this.props.gitOptions;

        if (typeof(url) !== 'undefined') {
            fetch(url, options)
                .then(response => response.json())
                .then(json => this.setState(json));
        }
    }

    onUpdateClick() {
        this.setState((prevState, props) => ({
                showProfileUpdate: !prevState.showProfileUpdate,
                isWithOverlay: !prevState.isWithOverlay
            })
        );

    }

    onDeleteClick() {
        this.setState((prevState, props) => ({
            showAskDelete: !prevState.showAskDelete,
            isWithOverlay: !prevState.isWithOverlay
            })
        );
    }

    render() {
        return (
            this.state &&
        <div>
        {/* if userId */}
            <div>
            {this.state.isWithOverlay && <Overlay/>}
                <div className="row mb-4">
                    <div className="col-sm">
                        <h2>
                            <span className="small text-uppercase text-muted d-block">Account</span>
                            {this.state.login} - {this.state.name}
                        </h2>
                    </div>
                    <div className="col-sm text-sm-right">
                        <Button>Sign out</Button>
                    </div>
                </div>
            </div>
            <Popup show={this.state.showAskDelete} 
                   popupClass={'popup-content'} 
                   animate={false} 
                   anchor={this.anchor}>
                <div className="content">
                    <div className="dialog-header">
                        <div className="k-window-title k-dialog-title">Are you sure you want to do this?</div>
                        <div className="k-window-actions k-dialog-actions">
                            <button onClick={this.onDeleteClick} aria-label="Close" className="k-button k-bare k-button-icon k-window-action k-dialog-action k-dialog-close">
                                <span className="k-icon k-i-x"></span>
                            </button>
                        </div>
                    </div>
                    <div className="dialog-content">
                        <p>Account deletetion cannot be undone!</p>
                    </div>
                    <div className="dialog-footer">
                        <Button onClick={this.onDeleteClick}>Cancel</Button>
                        <Button primary={true} onClick={this.onDeleteClick}>Delete Account</Button>
                    </div>
                </div>
            </Popup>
            <Popup show={this.state.showProfileUpdate} 
                   popupClass={'popup-content'} 
                   animate={false} 
                   anchor={this.anchor}>
                <div className="content">
                    <div className="dialog-header">
                        <div className="k-window-title k-dialog-title">Thank you</div>
                        <div className="k-window-actions k-dialog-actions">
                            <button onClick={this.onUpdateClick} aria-label="Close" className="k-button k-bare k-button-icon k-window-action k-dialog-action k-dialog-close">
                                <span className="k-icon k-i-x"></span>
                            </button>
                        </div>
                    </div>
                    <div className="dialog-content">
                        <p>Your profile has been successfully updated</p>
                    </div>
                <div className="dialog-footer">
                    <Button onClick={this.onUpdateClick}>OK</Button>
                </div>
         </div>
     </Popup>
            <div className="row">
                <div className="col-md-7">

                    <div className="card" id="profile">
                        <h3 className="card-header">Public Profile</h3>
                        <div className="card-body">

                            <div className="row">
                                <div className="col-md-3 text-xs-center">
                                    <img src={this.state.avatar_url} alt="Avatar URL" style={{'maxWidth': '100%'}} className="img-circle mx-auto" />
                                </div>
                                <div className="col-md-9">
                                    <div className="form-group">
                                        <label className="h6">Username</label>
                                        <input type="text" id="username" className="form-control" defaultValue={this.state.login} />
                                    </div>
                                    <div className="form-group">
                                        <label className="h6">Name</label>
                                        <input type="text" id="name" className="form-control" defaultValue={this.state.name} ref={(button) => {
                                            this.anchor = button;
                                        }}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="h6">Email</label>
                                        <input type="email" id="email" className="form-control" defaultValue={this.state.email} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-check-label h6">
                                        <input type="checkbox" id="email-pr" className="form-check-input k-checkbox" defaultChecked />
                                        <label className="k-checkbox-label" htmlFor="email-pr">Keep my email address private</label>
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label className="h6">Company</label>
                                        <input type="text" id="company" className="form-control" defaultValue={this.state.company} />
                                    </div>
                                    <div className="form-group">
                                        <label className="h6">Location</label>
                                        <input type="text" id="location" className="form-control" defaultValue={this.state.location} />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary" onClick={this.onUpdateClick}>Update profile</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="card" id="delete-account">
                        <h3 className="card-header">Delete Account</h3>
                        <div className="card-body">
                            <p>You will immediately lose access to your repositories and all other information associated with your account.
                                <strong>This cannot be undone!</strong>
                            </p>
                            <button className="btn btn-danger" onClick={this.onDeleteClick}>Delete Account</button>
                        </div>
                    </div>

                </div>

                <div className="col-md-5">

                    <div className="card" id="notifications">
                        <h3 className="card-header">Notifications</h3>
                        <div className="card-body">
                            <h4 className="h6">Automatically watch repositories?</h4>
                            <p className="text-muted">When you are given push access to a repository, automatically receive notifications for it.</p>
                            <p>
                                <Switch></Switch>
                            </p>
                            <h4 className="h6">Receive updates to any conversations via email?</h4>
                            <p>
                                <Switch defaultChecked={true}></Switch>
                            </p>
                            <h4 className="h6">Receive updates to any repositories via email?</h4>
                            <p>
                                <Switch defaultChecked={true}></Switch>
                            </p>
                        </div>
                    </div>
                    <div className="card" id="password">
                        <h3 className="card-header">Update password</h3>
                        <div className="card-body">
                            <div className="form-group">
                                <label className="h6">Old password</label>
                                <input type="password" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="h6">New password</label>
                                <input type="password" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="h6">Confirm password</label>
                                <input type="password" className="form-control" />
                            </div>
                            <div className="form-group">
                            <button className="btn btn-secondary">Change password</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
        );
    }
}

export default Profile;
