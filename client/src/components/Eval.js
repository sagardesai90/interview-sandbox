import React, { Component } from "react";

class Eval extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.code,
    };
  }

  render() {
    return <p>hello </p>;
  }
}

export default Eval;
