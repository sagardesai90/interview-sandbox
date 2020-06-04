import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import CodingPage from "../pages/Coding";
import HomePage from "../pages/Home";

// import AppRouter from './App.router'

class App extends Component {
  componentDidMount() {
    // Include the Crisp code here, without the <script></script> tags
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "8cf64773-bd33-4bfa-9b90-008d5d033135";

    (function () {
      var d = document;
      var s = d.createElement("script");

      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }

  render() {
    return (
      <Router>
        <div className="App">
          {/* <AppRouter /> */}
          <Route exact path="/" component={HomePage} />
          <Route path="/:sessionid" component={CodingPage} />
        </div>
      </Router>
    );
  }
}
export default App;
