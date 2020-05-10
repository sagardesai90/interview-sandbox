import React from "react";
import Header from "../../components/Header";
import { database } from "firebase";
import CodeMirror from "react-codemirror";
import "./Coding.css";
import VideoChat from "../../components/VideoChat";
import Eval from "../../components/Eval";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

require("codemirror/lib/codemirror.css");
require("codemirror/mode/javascript/javascript");
require("codemirror/theme/dracula.css");

export default class CodingPage extends React.Component {
  state = {
    code: "Loading...",
    loading: true,
    cursorPosition: {
      line: 0,
      ch: 0,
    },
    witeboard: null,
  };
  targetElement = null;
  componentDidMount = () => {
    const { params } = this.props.match;
    console.log(params);
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
          },
          () => {
            let content = snapshot.val().content;
            //   console.log(this.codemirror.getCodeMirror());

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
    this.targetElement = document.querySelector("#mainElement");
  };

  showTargetElement = () => {
    // ... some logic to show target element

    // 3. Disable body scroll
    disableBodyScroll(this.targetElement);
    console.log(this.targetElement, "targetElement");
  };

  changeCursorPos = () => {
    const { line, ch } = this.state.cursorPosition;
    this.codemirror.getCodeMirror().doc.setCursor(line, ch);
  };
  onChange = (newVal, change) => {
    console.log(newVal, change);
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
      <React.Fragment>
        <Header
          style={{ background: "#1d1f27" }}
          extras={
            <div>
              {this.state.createdon
                ? `Created On: ${this.state.createdon}`
                : ""}
            </div>
          }
        />
        <div className="coding" id="mainElement">
          <div className="coding-page">
            <CodeMirror
              ref={(r) => (this.codemirror = r)}
              className="code-mirror-container"
              value={this.state.code}
              onChange={this.onChange}
              options={{
                theme: "dracula",
                lineNumbers: true,
                readOnly: false,
                mode: "javascript",
              }}
            />
          </div>
          <div>
            <iframe className="witeboard" src={this.state.witeboard}></iframe>
          </div>
          <div className="lowerMenu">
            <Eval code={this.state.code} />
          </div>
          <div className="lowerMenu">
            <VideoChat />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// WEBPACK FOOTER //
// ./src/containers/pages/Coding.js
