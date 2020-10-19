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
      <a
        href="https://www.producthunt.com/posts/interview-sandbox?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-interview-sandbox"
        target="_blank"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=203837&theme=light"
          alt="Interview Sandbox - Write code, video chat, and draw in realtime with others. | Product Hunt Embed"
          style={{ paddingTop: "0.5rem" }}
          width="106px"
          height="22.896px"
          className="PH"
        />
      </a>
    </header>
  );
};

export default Header;
