import React, { Component } from "react";
import { connect } from "react-redux";
import { writeMessage, postMessage } from "../store.js";

class NewMessageEntry extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      message: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const content = this.state.message;
    const channelId = this.props.channelId;
    const name = this.props.name;
    this.props.post({ content, channelId, name });
    this.setState({
      message: "",
    });
  }

  render() {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.state.message}
            onChange={this.handleChange}
            placeholder="Say something..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              Chat!
            </button>
          </span>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  newMessageEntry: state.newMessageEntry,
  name: state.username,
});

const mapDispatchToProps = (dispatch) => ({
  write: () => dispatch(writeMessage()),
  post: (message) => dispatch(postMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry);
