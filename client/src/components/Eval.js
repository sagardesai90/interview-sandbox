import React from "react";
import Spinner from "./Spinner.js";
import DropdownTheme from "./DropdownTheme";
import { database } from "firebase";
import { IconContext } from "react-icons";
import { FaRegPlayCircle } from "react-icons/fa";
import "./Eval.css";
import "../fonts/Modenine-2OPd.ttf";

class Eval extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.code,
      language_id: this.props.language_id,
      token: null,
      evalOutput: null,
      loading: false,
      sessionid: this.props.sessionid,
      mode: "terminal",
      theme: [
        {
          id: 0,
          mode: "plain",
          key: "theme",
          title: "Plain",
          selected: false,
        },
        {
          id: 1,
          mode: "terminal",
          key: "theme",
          title: "Terminal",
          selected: false,
        },
        // {
        //   id: 2,
        //   mode: "nintendoid",
        //   key: "theme",
        //   title: "Nintendoid",
        //   selected: false,
        // },
      ],
      currTheme: "Terminal",
    };
    this.runCode = this.runCode.bind(this);
    this.useToken = this.useToken.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  //Lets you select between JS, Python, Ruby
  toggleTheme(id, key, mode) {
    let temp = this.state[key];
    temp[id].selected = !temp[id].selected;
    let newMode = this.state[key][id];
    this.setState({
      [key]: temp,
      mode: newMode["mode"],
      currTheme: newMode["title"],
    });
  }

  //As the user enters code into the editor, our Eval component receives relevant info
  //that is used for downstrream functions.
  async componentWillReceiveProps(newProps) {
    this.setState({
      code: newProps.code,
      language_id: newProps.language_id,
      sessionid: this.props.sessionid,
    });
    let self = this;
    //This is where the code execution in state is updated from the Firebase database
    database()
      .ref("code-sessions/" + this.props.sessionid)
      .once("value")
      .then((snapshot) => {
        let val = snapshot.val() || "Terminal output here.";
        let valOut = val.evalOutput;
        self.setState({ evalOutput: valOut });
      });
  }

  // The Judge0 API is used to evaluste the users code,
  // there are two steps to that. 1-A code submission (POST request) is
  // made, and the response is a token. Then that token is used in a GET
  // request to return the result of the code execution. I split this
  // between the runCode() and useToken functions.
  async runCode() {
    this.setState({ loading: true });
    const initialToken = await fetch(
      "https://judge0.p.rapidapi.com/submissions",
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "judge0.p.rapidapi.com",
          "x-rapidapi-key":
            "fd1e306d91msh9ad92d420409e41p14b863jsne1e71e9d9ea2",
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          language_id: this.state.language_id,
          source_code: this.state.code,
          stdin: "world",
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let token = data.token;

        this.setState({ token: token });
        return token;
      })
      .then((data) => {
        setTimeout(() => {
          //We use a 1 second delay to prevent a 429 (too many requests)
          //error on the server side, and call the useFunction
          this.useToken();
        }, 1000);
      })
      .catch((err) => {
        console.log(err, "this is your error");
      });
  }

  async useToken() {
    const getSubmission = await fetch(
      `https://judge0.p.rapidapi.com/submissions/${this.state.token}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "judge0.p.rapidapi.com",
          "x-rapidapi-key":
            "fd1e306d91msh9ad92d420409e41p14b863jsne1e71e9d9ea2",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.status.id, "data.status");
        if (data.status.id < 3) {
          setTimeout(() => {
            this.useToken();
          }, 1500);
        }
        if (data.stdout) {
          let evalOutput = data.stdout;
          this.setState({ evalOutput: evalOutput, loading: false });
          database()
            .ref("code-sessions/" + this.props.sessionid)
            .update({
              evalOutput: this.state.evalOutput,
            });
        } else if (data.stdout == null) {
          let errOut = data.status.description;
          this.setState({
            evalOutput: errOut,
            loading: false,
          });
          database()
            .ref("code-sessions/" + this.props.sessionid)
            .update({
              evalOutput: this.state.evalOutput,
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let evalOutput = this.state.evalOutput;
    let loading = this.state.loading;
    //We conditionally render "Terminal output here" or the result of
    //our code execution, if it exists in our database.
    const conditionalRender = () => {
      if (loading) {
        return <Spinner />;
      } else if (!loading && !evalOutput) {
        return <p className="codeRes">Terminal output here.</p>;
      } else if (evalOutput) {
        return (
          <p
            className={
              this.state.currTheme === "Terminal" ? "codeRes" : "codeRes-plain"
            }
          >
            {evalOutput}
          </p>
        );
      }
    };

    return (
      <div className="eval">
        {conditionalRender()}
        <div>
          <button className="evalBtn" onClick={this.runCode.bind(this)}>
            <IconContext.Provider
              value={{ size: "0.8em", style: { paddingRight: "0.2rem" } }}
            >
              <FaRegPlayCircle />
            </IconContext.Provider>
            Run Code
          </button>
          <DropdownTheme
            toggleItem={this.toggleTheme}
            title="Theme "
            theme={this.state.theme}
          />
        </div>
      </div>
    );
  }
}

export default Eval;
