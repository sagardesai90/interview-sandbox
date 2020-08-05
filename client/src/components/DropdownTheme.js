import React, { Component } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import "font-awesome/css/font-awesome.min.css";
import "./DropdownTheme.css";

export default class DropdownTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title,
      theme: this.props.theme,
    };
  }

  handleClickOutside() {
    this.setState({
      listOpen: false,
    });
  }

  toggleList() {
    this.setState((prevState) => ({
      listOpen: !prevState.listOpen,
    }));
  }

  render() {
    const { theme } = this.props;
    console.log(theme, "theme");
    const { listOpen, headerTitle } = this.state;
    return (
      <div
        className="dd-wrapper"
        onMouseEnter={() => this.toggleList()}
        onMouseLeave={() => this.toggleList()}
      >
        <div className="dd-header">
          <div className="dd-header-title">
            {headerTitle}
            {listOpen ? <FaAngleUp /> : <FaAngleDown />}
          </div>
        </div>
        {listOpen && (
          <ul className="dd-list-item">
            {theme.map((item) => (
              <li onClick={() => this.props.toggleItem(item.id, item.key)}>
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
