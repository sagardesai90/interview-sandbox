import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import rand from "random-key";
import { database } from "firebase";
import Typewriter from "typewriter-effect";
import "./Home.css";

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
            {/* <br /> */}
            Share Code with
            <Typewriter
              className="homepage"
              options={{
                strings: [
                  "interviewers",
                  "interviewees",
                  "coworkers",
                  "classmates",
                  "friends",
                  "hackers",
                ],
                autoStart: true,
                loop: true,
              }}
              onInit={(typewriter) => {}}
            />
            in <span className="highlight ">Realtime</span>.
            <br />
            Anywhere, Anytime and with <span className="highlight">Anyone</span>
            .
            <p>
              Oh, and you can also <span className="highlight">video chat</span>{" "}
              and <span className="highlight cursive neon">draw</span>.
            </p>
          </p>

          <p className="sub-title">
            A simple real time code sharing app built with Firebase Realtime
            Database, Code Mirror as Editor, WebRTC video chat, and Witeboard.
          </p>
          <div className="buttonDiv">
            <button className="btn letsGo" onClick={this.onNewGround}>
              Let's go
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// WEBPACK FOOTER //
// ./src/containers/pages/Home.js
