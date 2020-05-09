import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase";
import config from "./firebase-config.json"; // Config Json File

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
