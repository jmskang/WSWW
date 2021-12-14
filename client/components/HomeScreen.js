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
      <img src='/images/WSWW.jpg'></img>
      <div className='home-options'>
        <div className='helper-text'>
          <div>Create a new room</div>
          <div>or join an existing one!</div>
          <hr style={{ width: '90%' }} />
          <div style={{ paddingTop: '50px', width: '95%', marginLeft: '2.5%' }}>
            You and your partner are given 10 random trending movies on Netflix.
          </div>
          <div style={{ width: '95%', marginLeft: '2.5%' }}>
            Pick which movies you want to watch and see your matches at the end!
          </div>
        </div>
        <div className='create-new-session' onClick={handleNewSession}>
          Create a New Room
        </div>

        <div className='join-session-wrapper'>
          <div>Join a Room</div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <input
              id='session-code-input'
              type='text'
              autoComplete='off'
              style={{ textAlign: 'center' }}
              placeholder='Enter room code!'
            ></input>
            <div className='join-button' onClick={handleJoinSession}>
              Join!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
