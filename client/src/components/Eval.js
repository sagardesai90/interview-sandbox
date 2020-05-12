import React from "react";

class Eval extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.code,
    };
  }

  render() {
    return (
      <p style={{ padding: "1rem", color: "#66ff66" }}>
        Terminal output here (coming soon).
      </p>
    );
  }
}

export default Eval;
