import React, { Component } from "react";
import { connect } from "react-redux";
import { changeUsername } from "../store";

class NameEntry extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.updateName(event.target.value);
  }

  render() {
    return (
      <form className="form-inline">
        <label htmlFor="name">Your name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateName: (username) => dispatch(changeUsername(username)),
});

export default connect(null, mapDispatchToProps)(NameEntry);
