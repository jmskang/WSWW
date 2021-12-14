import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SessionHeader from './SessionHeader';
import MovieCard from './MovieCard';

const Session = () => {
  const history = useHistory();
  const partner = useSelector((state) => state.partner);
  const roomCode = useSelector((state) => state.roomName);

  const handleClick = () => {
    history.push('/home');
  };

  return partner ? (
    <div>
      <SessionHeader />
      <MovieCard />
    </div>
  ) : (
    <div className='waiting-for-partner-wrapper'>
      <img src='/images/WSWW.jpg'></img>
      <div className='room-code-header'>
        <div className='room-code-text'>
          Your Room Code is: <div>{roomCode}</div>
        </div>
        <div className='loading-spinner-wrapper'>
          <div>Waiting for your partner</div>
          <div style={{ textAlign: 'center' }}>:)</div>
          <div className='loader' />
        </div>
        <div className='back-button' onClick={handleClick}>
          Back
        </div>
      </div>
    </div>
  );
};

export default Session;
