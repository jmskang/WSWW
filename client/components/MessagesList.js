import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import axios from 'axios';
import { fetchMessagesFromServer } from '../store';
import {connect} from 'react-redux';

class MessagesList extends Component {

  async componentDidMount () {
    this.props.fetchMessages();
  }
  render () {
    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.props.messages;
    const filteredMessages = messages.filter(message => message.channelId === channelId);

    return (
      <div>
        <ul className="media-list">
          { filteredMessages.map(message => <Message message={message} key={message.id} />) }
        </ul>
        <NewMessageEntry />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {messages: state.messages}
}

const mapDispatchToProps = (dispatch) => {
  return {fetchMessages: () => dispatch(fetchMessagesFromServer())}
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);