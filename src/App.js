import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { TopHeader } from "./TopHeader";
import createBrowserHistory from "history/createBrowserHistory";

const customHistory = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={customHistory}>
        <div>
          <TopHeader />
        </div>
      </Router>
    );
  }
}

export default App;
