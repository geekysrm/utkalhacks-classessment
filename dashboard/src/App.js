import React, { Component } from 'react';
import { connect } from 'react-redux';
import { issuesFetched, issuesReceived, issuesDetails } from './actions/index';
import MainMenu from './components/MainMenu';

/* import logo from './logo.svg'; */
import './App.css';

const baseUrl = 'https://api.github.com/repos/telerik/kendo-ui-core/issues';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  componentDidMount() {
    const { dispatch } = this.props;

    let dispatcher = data => {
      this.setState({ loading: false });
      dispatch(issuesReceived(data));
      dispatch(issuesDetails(data));
    };

    dispatch(issuesFetched());

    return (
      Promise.all(this.getPageFetchers(10))
        .then(responses => responses.map(res => res.json()))
        .then(issues => Promise.all(issues))
        /* response is array of arrays. Each page is in an array */
        .then(arraysOfData =>
          arraysOfData.reduce((prev, current) => prev.concat(current))
        )
        .then(result => dispatcher(result))
    );
  }

  getPageFetchers(numberOfPages) {
    let fetches = [];
    let headers = {
      // Generate your own token through
      // https://github.com/settings/tokens

      Authorization: 'token b95116792cba5a8169a1ec10640d8c16535c6419'
    };

    let options = {
      method: 'GET',
      accept: 'application/json',
      headers: headers
    };

    for (let page = 1; page <= numberOfPages; page++) {
      let url = baseUrl + `?state=all&page=${page}&per_page=50`;
      fetches.push(fetch(url, options));
    }

    return fetches;
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <span className="k-icon k-i-loading" />
        ) : (
          <MainMenu {...this.props} />
        )}
      </div>
    );
  }
}

export default connect()(App);
