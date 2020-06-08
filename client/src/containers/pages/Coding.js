import React from "react";
import Header from "../../components/Header";
import { database } from "firebase";
import CodeMirror from "react-codemirror";
import "./Coding.css";
import VideoChat from "../../components/VideoChat";
import Eval from "../../components/Eval";
import { RemoveScroll } from "react-remove-scroll";
import Dropdown from "../../components/Dropdown";
import ReactGA from "react-ga";

require("codemirror/lib/codemirror.css");
require("codemirror/theme/dracula.css");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/ruby/ruby");
require("codemirror/mode/python/python");
require("codemirror/mode/swift/swift");
require("codemirror/mode/clike/clike");
require("codemirror/mode/go/go");
require("codemirror/mode/php/php");
require("codemirror/mode/r/r");
require("codemirror/addon/display/placeholder");
require("codemirror/addon/edit/matchbrackets");
require("codemirror/addon/edit/matchtags");
require("codemirror/addon/edit/closebrackets");
require("codemirror/addon/edit/closetag");

function initializeAnalytics() {
  ReactGA.initialize("UA-154969560-1");
  ReactGA.pageview("/Coding");
}

export default class CodingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      code: "Loading...",
      loading: true,
      mode: "python",
      language_id: 71,
      language: [
        {
          id: 0,
          language_id: 63,
          title: " Javascript",
          mode: "javascript",
          fa_icon: "FaJsSquare",
          selected: false,
          key: "language",
        },
        {
          id: 1,
          language_id: 71,
          title: " Python",
          mode: "python",
          fa_icon: "FaPython",
          selected: false,
          key: "language",
        },
        {
          id: 2,
          language_id: 72,
          title: " Ruby",
          mode: "ruby",
          fa_icon: "FaGem",
          selected: false,
          key: "language",
        },
        {
          id: 3,
          language_id: 83,
          title: " Swift",
          mode: "swift",
          fa_icon: "FaSwift",
          selected: false,
          key: "language",
        },
        {
          id: 4,
          language_id: 62,
          title: " Java",
          mode: "text/x-java",
          fa_icon: "FaJava",
          selected: false,
          key: "language",
        },
        {
          id: 5,
          language_id: 60,
          title: " Go",
          mode: "text/x-go",
          fa_icon: "FaGoogle",
          selected: false,
          key: "language",
        },
        {
          id: 6,
          language_id: 78,
          title: " Kotlin",
          mode: "text/x-kotlin",
          fa_icon: "FaAndroid",
          selected: false,
          key: "language",
        },
        {
          id: 7,
          language_id: 68,
          title: " PHP",
          mode: "application/x-httpd-php",
          fa_icon: "FaPhp",
          selected: false,
          key: "language",
        },
        {
          id: 8,
          language_id: 80,
          title: " R",
          mode: "text/x-rsrc",
          fa_icon: "FaRProject",
          selected: false,
          key: "language",
        },
      ],
      currlang: " Python",
      cursorPosition: {
        line: 0,
        ch: 0,
      },
      witeboard: null,
      sessionid: null,
    };
    this.toggleLanguage = this.toggleLanguage.bind(this);
  }
  componentDidMount = () => {
    const { params } = this.props.match;

    let self = this;

    //Where you store the code in the Firebase Realtime database
    database()
      .ref("/code-sessions/" + params.sessionid)
      .once("value")
      .then((snapshot) => {
        self.setState(
          {
            code: snapshot.val().content + "",
            createdon: snapshot.val().createdon,
            witeboard: "https://witeboard.com/" + params.sessionid,
            sessionid: params.sessionid,
          },
          () => {
            let content = snapshot.val().content;

            self.codemirror.getCodeMirror().setValue(content);
          }
        );
        this.codeRef = database().ref("code-sessions/" + params.sessionid);
        this.codeRef.on("value", function (snapshot) {
          self.setState({
            code: snapshot.val().content,
          });
          var currentCursorPos = self.state.cursorPosition;
          self.codemirror.getCodeMirror().setValue(snapshot.val().content);
          self.setState({ cursorPosition: currentCursorPos });
          self.changeCursorPos();
        });
      })
      .catch((e) => {
        self.codemirror.getCodeMirror().setValue("No Sessions Found!");
      });
  };

  //Lets you select between JS, Python, Ruby
  toggleLanguage(id, key, mode) {
    let temp = this.state[key];
    temp[id].selected = !temp[id].selected;
    let newMode = this.state[key][id];
    this.setState({
      [key]: temp,
      mode: newMode["mode"],
      language_id: newMode["language_id"],
      currlang: newMode["title"],
    });
  }

  //To keep track of where the cursor is currently
  changeCursorPos = () => {
    const { line, ch } = this.state.cursorPosition;
    this.codemirror.getCodeMirror().doc.setCursor(line, ch);
  };

  //This is where the code editor handles changes from user input
  onChange = (newVal, change) => {
    this.setState(
      {
        cursorPosition: {
          line: this.codemirror.getCodeMirror().doc.getCursor().line,
          ch: this.codemirror.getCodeMirror().doc.getCursor().ch,
        },
      },
      () => {}
    );
    this.codeRef.child("content").set(newVal);
  };

  render() {
    initializeAnalytics();
    return (
      <RemoveScroll>
        <React.Fragment>
          <Header
            style={{ background: "#282a36" }}
            extras={
              <div>
                {this.state.createdon
                  ? `Created On: ${this.state.createdon}`
                  : ""}
              </div>
            }
          />
          <div className="coding">
            <div className="coding-page">
              {/* This is where the DROPDOWN menu goes */}
              <Dropdown
                title="Language "
                list={this.state.language}
                toggleItem={this.toggleLanguage}
                className="dropdown"
                currLang={this.state.currlang}
              />
              {/* This is where the CODE EDITOR goes */}
              <CodeMirror
                ref={(r) => (this.codemirror = r)}
                className="code-mirror-container"
                value={this.state.code}
                onChange={this.onChange}
                options={{
                  theme: "dracula",
                  lineNumbers: true,
                  lineWrapping: true,
                  tabMode: "indent",
                  matchBrackets: true,
                  matchTags: true,
                  autoCloseTags: true,
                  autoCloseBrackets: true,
                  readOnly: false,
                  mode: this.state.mode,
                }}
                placeholder="this is the placeholder text"
              />
            </div>
            <div>
              {/* This is where the WHITEBOARD goes */}
              <iframe
                title="Witeboard"
                className="witeboard"
                src={this.state.witeboard}
              ></iframe>
            </div>
            <div className="lowerMenu">
              {/* This is where the CODE EXECUTION happens */}
              <Eval
                code={this.state.code}
                language_id={this.state.language_id}
                sessionid={this.state.sessionid}
              />
            </div>
            <div className="lowerMenu">
              {/* This is where the VIDEO CHAT goes */}
              {this.state.sessionid === null ? (
                <div />
              ) : (
                <VideoChat sessionid={this.state.sessionid} />
              )}
            </div>
          </div>
          <div>
            <a
              className="sponsor2"
              href="https://bit.ly/3gPILy7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                Sponsored by <b>Judge0</b> - The world's most advanced
                open-source online code execution system.
              </span>
            </a>
          </div>
        </React.Fragment>
      </RemoveScroll>
    );
  }
}

// WEBPACK FOOTER //
// ./src/containers/pages/Coding.js
