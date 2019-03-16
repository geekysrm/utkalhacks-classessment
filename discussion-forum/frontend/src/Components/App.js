import React from 'react';
import { Router, Route, Switch } from "react-router-dom";

import CreateThread from './Thread/CreateThread';
import SearchThread from './Thread/SearchThread';
import ShowPost from "./Posts/ShowPost";
import Welcome from './Welcome';
import Navbar from "../Navbar";
import history from "../history";

class App extends React.Component {
    render() {
        return (
            <div> 
                <Router history={history}>
                    <div>
                        <Navbar />
                        <Switch>
                            <Route path="/" exact component={Welcome} />
                            <Route path="/thread/new" exact component={CreateThread} />
                            <Route path="/thread" exact component={SearchThread} />
                            <Route path="/thread/:id" exact component={ShowPost} />                           
                        </Switch>
                    </div>
                </Router>
            </div>
            )
    }
}

export default App;