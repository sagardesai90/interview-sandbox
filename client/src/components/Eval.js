import React, { Component } from "react";

class Eval extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.code,
    };
  }

  render() {
    return (
      <p style={{ padding: "1rem" }}>Terminal output here (coming soon).</p>
    );
  }
}

export default Eval;
