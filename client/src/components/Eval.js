import React from "react";
import "./Eval.css";

class Eval extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.code,
      language_id: this.props.language_id,
      token: null,
      evalOutput: null,
    };
    this.runCode = this.runCode.bind(this);
    this.useToken = this.useToken.bind(this);
  }

  async componentWillReceiveProps(newProps) {
    this.setState({ code: newProps.code, language_id: newProps.language_id });
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
        let evalOutput = data.stdout;
        this.setState({ evalOutput: evalOutput });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async runCode() {
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
          this.useToken();
        }, 1000);
      })
      .catch((err) => {
        console.log(err, "this is your error");
      });
  }

  render() {
    let evalOutput = this.state.evalOutput;
    return (
      <div className="">
        <button className="evalBtn" onClick={this.runCode.bind(this)}>
          Run Code
        </button>
        <p style={{ padding: "1rem", color: "#66ff66" }}>
          {evalOutput ? (
            <div>{evalOutput}</div>
          ) : (
            <div>Terminal output here.</div>
          )}
        </p>
      </div>
    );
  }
}

export default Eval;
