import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import rand from "random-key";
import { database } from "firebase";

export default class HomePage extends React.Component {
  state = {
    key: rand.generate(5),
    num: null,
  };
  componentDidMount = () => {
    database()
      .ref("code-sessions")
      .on("value", (s) => {
        this.setState({ num: s.numChildren() });
      });
  };

  onNewGround = () => {
    database()
      .ref("code-sessions/" + this.state.key)
      .set({
        content: "Happy Coding",
        createdon: Date(),
      });
    this.props.history.push("/" + this.state.key);
  };
  render() {
    return (
      <React.Fragment>
        <Header
          extras={this.state.num ? `Total ${this.state.num}+ Shares` : null}
        />
        <div className="homepage">
          <p className="title">
            <br />
            Share Code with in <span className="highlight">Realtime</span>.
            <br />
            Anywhere, Anytime and with <span className="highlight">Anyone</span>
            .
          </p>

          <p className="sub-title">
            Simple Realtime Code Sharing Editor App. Using Firebase Realtime
            Database and Code Mirror as Editor.
          </p>
          <div>
            <button className="btn" onClick={this.onNewGround}>
              Share Code
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// WEBPACK FOOTER //
// ./src/containers/pages/Home.js
