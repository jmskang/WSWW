import React from 'react';
import { useHistory } from 'react-router-dom';
import socket from '../socket';
import { useDispatch, useSelector } from 'react-redux';
import { createNewSession } from '../store';

const HomeScreen = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const partner = useSelector((state) => state.partner);

  const handleNewSession = () => {
    socket.emit('newSession');
    history.push('/session');
  };

  const handleJoinSession = () => {
    const sessionCode = document.getElementById('session-code-input').value;
    socket.emit('joinSession', sessionCode);
    history.push('/session');
  };

  return (
    <div className='home-component-wrapper'>
      <h1>What Should We Watch?</h1>
      <div className='create-new-session-wrapper'>
        <h3 onClick={handleNewSession}>Create a New Session</h3>
      </div>
      <div className='join-session-wrapper'>
        <h3 onClick={handleJoinSession}>Join a Session</h3>
        <input id='session-code-input' type='text' autoComplete='off' placeholder='Enter a session ID!'></input>
      </div>
    </div>
  );
};

export default HomeScreen;
