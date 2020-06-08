import React from "react";
import Header from "../../components/Header";
import rand from "random-key";
import { database } from "firebase";
import Typewriter from "typewriter-effect";
import ReactGA from "react-ga";
import "./Home.css";
import Judge0 from "../../components/Judge0.png";

function initializeAnalytics() {
  ReactGA.initialize("UA-154969560-1");
  ReactGA.pageview("/Home");
}

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

  // This function creates a new entry in our database when the user hits the 'Let's go' button
  onNewGround = () => {
    database()
      .ref("code-sessions/" + this.state.key)
      .set({
        content:
          '# Welcome to your Interview Sandbox! \n\n# 1 - Just share this link with another person \n# \t  to get them on the same page.\n# 2 - Once they join, you\'ll see the call button.\n# 3 - The code, code output, and drawings are synced\n#     in real time between users.\n# 4 - Select between Javascript, Python, Ruby, Swift, and Java.\n\n# Try running the code below to see the ouput!\n\nprint("happy coding")',
        createdon: Date(),
      });
    this.props.history.push("/" + this.state.key);
  };
  render() {
    initializeAnalytics();
    return (
      <React.Fragment>
        <Header
          extras={this.state.num ? `Total ${this.state.num}+ Shares` : null}
        />
        <div className="homepage">
          <p className="title">
            Share Code with
            {/* Where I cycle through some use cases */}
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
            Database, Code Mirror as Editor, WebRTC video chat, and Witeboard.{" "}
            <br></br>
            <br></br>
            Interview Sandbox is also open source, check out the{" "}
            <a
              href="https://github.com/sagardesai90/interview-sandbox"
              target="_blank"
              rel="noopener noreferrer"
              className="repo"
            >
              Github repo
            </a>
            .
          </p>

          <div className="buttonDiv">
            <button className="btn letsGo" onClick={this.onNewGround}>
              Let's go
            </button>
          </div>
          <a
            href="https://www.producthunt.com/posts/interview-sandbox?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-interview-sandbox"
            target="_blank"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=203837&theme=light"
              alt="Interview Sandbox - Write code, video chat, and draw in realtime with others. | Product Hunt Embed"
              style={{ paddingTop: "0.5rem" }}
              width="106px"
              height="22.896px"
            />
          </a>
          <div>
            <p className="sponsor">Sponsored by</p>
            <a
              href="https://bit.ly/3gPILy7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="Judge0" src={Judge0} alt="Judge0" />
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
