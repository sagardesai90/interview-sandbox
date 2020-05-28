import React from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaJsSquare,
  FaPython,
  FaGem,
  FaSwift,
} from "react-icons/fa";
import "font-awesome/css/font-awesome.min.css";
import "./Dropdown.css";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listOpen: false,
      headerTitle: this.props.title,
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
    const { list } = this.props;
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
          <ul className="dd-list">
            {list.map((item) => (
              <li
                className="dd-list-item"
                key={item.id}
                onClick={() => this.props.toggleItem(item.id, item.key)}
              >
                {/* <FontAwesomeIcon icon={item.fa_icon} size="5px" /> */}
                {/* <`${item.fa_icon}` /> */}
                {item.fa_icon === "FaJsSquare" && <FaJsSquare />}
                {item.fa_icon === "FaPython" && <FaPython />}
                {item.fa_icon === "FaGem" && <FaGem />}
                {item.fa_icon === "FaSwift" && <FaSwift />}
                {item.title}
              </li>
            ))}
          </ul>
        )}
        <span className="btn__label">{this.props.currLang}</span>
      </div>
    );
  }
}

export default Dropdown;
