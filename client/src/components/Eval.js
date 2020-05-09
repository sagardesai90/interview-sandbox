import React, { Component } from "react";

class Eval extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.code,
    };
  }

  render() {
    return <p>terminal output here</p>;
  }
}

export default Eval;
