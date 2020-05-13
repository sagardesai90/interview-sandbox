import React from "react";
import FontAwesome from "react-fontawesome";
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
          <div className="dd-header-title">{headerTitle}</div>
          {listOpen ? (
            <FontAwesome name="angle-up" size="2x" />
          ) : (
            <FontAwesome name="angle-down" size="2x" />
          )}
        </div>
        {listOpen && (
          <ul className="dd-list">
            {list.map((item) => (
              <li
                className="dd-list-item"
                key={item.id}
                onClick={() => this.props.toggleItem(item.id, item.key)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Dropdown;
