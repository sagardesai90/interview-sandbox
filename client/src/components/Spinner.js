import React from "react";
import "./Spinner.css";

class Spinner extends React.Component {
  render() {
    return (
      <div class="spinny-loader">
        <div class="spinny-circle"></div>
      </div>
    );
  }
}

export default Spinner;
