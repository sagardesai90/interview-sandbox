import React from "react";
import Header from "../../components/Header";
import { database } from "firebase";
import CodeMirror from "react-codemirror";
import "./Coding.css";
import VideoChat from "../../components/VideoChat";
import Eval from "../../components/Eval";
import { RemoveScroll } from "react-remove-scroll";
import Dropdown from "../../components/Dropdown";

require("codemirror/lib/codemirror.css");
require("codemirror/theme/dracula.css");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/ruby/ruby");
require("codemirror/mode/python/python");
require("codemirror/mode/jsx/jsx");
require("codemirror/mode/css/css");
require("codemirror/addon/display/placeholder");

export default class CodingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      code: "Loading...",
      loading: true,
      mode: "python",
      language: [
        {
          id: 0,
          title: "Javascript",
          mode: "javascript",
          selected: false,
          key: "language",
        },
        {
          id: 1,
          title: "Python",
          mode: "python",
          selected: false,
          key: "language",
        },
        { id: 2, title: "JSX", mode: "jsx", selected: false, key: "language" },
        {
          id: 3,
          title: "Ruby",
          mode: "ruby",
          selected: false,
          key: "language",
        },
        { id: 4, title: "CSS", mode: "css", selected: false, key: "language" },
      ],
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

  toggleLanguage(id, key, mode) {
    let temp = this.state[key];
    temp[id].selected = !temp[id].selected;
    let newMode = this.state[key][id];
    this.setState({
      [key]: temp,
      mode: newMode["mode"],
    });
    console.log(this.state, "state in Coding.js");
  }

  changeCursorPos = () => {
    const { line, ch } = this.state.cursorPosition;
    this.codemirror.getCodeMirror().doc.setCursor(line, ch);
  };

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
              <Dropdown
                title="Select Language"
                list={this.state.language}
                toggleItem={this.toggleLanguage}
                className="dropdown"
              />
              <CodeMirror
                ref={(r) => (this.codemirror = r)}
                className="code-mirror-container"
                value={this.state.code}
                onChange={this.onChange}
                options={{
                  theme: "dracula",
                  lineNumbers: true,
                  readOnly: false,
                  mode: this.state.mode,
                }}
                placeholder="this is the placeholder text"
              />
            </div>
            <div>
              <iframe
                title="Witeboard"
                className="witeboard"
                src={this.state.witeboard}
              ></iframe>
            </div>
            <div className="lowerMenu">
              <Eval code={this.state.code} />
            </div>
            <div className="lowerMenu">
              <VideoChat sessionid={this.state.sessionid} />
            </div>
          </div>
        </React.Fragment>
      </RemoveScroll>
    );
  }
}

// WEBPACK FOOTER //
// ./src/containers/pages/Coding.js
