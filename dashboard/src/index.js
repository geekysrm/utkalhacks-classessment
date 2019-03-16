import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import App from './App';

import './index.scss';

import { issuesStore } from "./store";
import { Provider } from "react-redux";

const AppWithRouting = withRouter(App);


ReactDOM.render((

    <Provider store={issuesStore}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <AppWithRouting />
        </BrowserRouter>
    </Provider>
    ),
    document.getElementById('root')
);
