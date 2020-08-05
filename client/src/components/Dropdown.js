import React from "react";
import { IconContext } from "react-icons";
import {
  FaAngleDown,
  FaAngleUp,
  FaJsSquare,
  FaPython,
  FaGem,
  FaSwift,
  FaJava,
  FaGoogle,
  FaAndroid,
  FaPhp,
  FaRProject,
  FaBars,
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
                {item.fa_icon === "FaJava" && <FaJava />}
                {item.fa_icon === "FaGoogle" && <FaGoogle />}
                {item.fa_icon === "FaAndroid" && <FaAndroid />}
                {item.fa_icon === "FaPhp" && <FaPhp />}
                {item.fa_icon === "FaRProject" && <FaRProject />}
                {item.fa_icon === "FaBars" && <FaBars />}
                {item.title}
              </li>
            ))}
          </ul>
        )}
        <span className="btn__label">
          {this.props.currLang === " Python" && (
            <IconContext.Provider value={{ size: "0.5rem" }}>
              <FaPython />{" "}
            </IconContext.Provider>
          )}
          {this.props.currLang === " Javascript" && (
            <IconContext.Provider value={{ size: "0.5rem" }}>
              <FaJsSquare />{" "}
            </IconContext.Provider>
          )}
          {this.props.currLang === " Ruby" && (
            <IconContext.Provider value={{ size: "0.5rem" }}>
              <FaGem />{" "}
            </IconContext.Provider>
          )}
          {this.props.currLang === " Swift" && (
            <IconContext.Provider value={{ size: "0.5rem" }}>
              <FaSwift />{" "}
            </IconContext.Provider>
          )}
          {this.props.currLang === " Java" && (
            <IconContext.Provider value={{ size: "0.5rem" }}>
              <FaJava />{" "}
            </IconContext.Provider>
          )}
          {this.props.currLang === " Go" && (
            <IconContext.Provider value={{ size: "0.5rem" }}>
              <FaGoogle />{" "}
            </IconContext.Provider>
          )}
          {this.props.currLang === " Kotlin" && (
            <IconContext.Provider value={{ size: "0.5rem" }}>
              <FaAndroid />{" "}
            </IconContext.Provider>
          )}
          {this.props.currLang === " PHP" && (
            <IconContext.Provider value={{ size: "0.5rem" }}>
              <FaPhp />{" "}
            </IconContext.Provider>
          )}
          {this.props.currLang === " R" && (
            <IconContext.Provider value={{ size: "0.5rem" }}>
              <FaRProject />{" "}
            </IconContext.Provider>
          )}
          {this.props.currLang === " Scala" && (
            <IconContext.Provider value={{ size: "0.5rem" }}>
              <FaBars />{" "}
            </IconContext.Provider>
          )}
          {this.props.currLang}
        </span>
      </div>
    );
  }
}

export default Dropdown;
