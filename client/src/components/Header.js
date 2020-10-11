import React from "react";
import { Link } from "react-router-dom";
import Chad from "./chad.png";
import "./Header.css";
type Props = {
  style: React.CSSProperties,
  extras: React.ReactHTML,
};

const Header = (props: Props) => {
  return (
    <header style={props.style} className="App-header">
      <img className="mainLogo" src={Chad} />
      <Link className="App-title" to="/">
        Interview Sandbox
      </Link>
      <div className="extras">{props.extras}</div>
    </header>
  );
};

export default Header;
