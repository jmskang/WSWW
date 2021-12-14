import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SessionHeader from './SessionHeader';
import MovieCard from './MovieCard';
import MatchedMovies from './MatchedMovies';

const Session = () => {
  const history = useHistory();
  const partner = useSelector((state) => state.partner);
  const roomCode = useSelector((state) => state.roomName);
  const matchedMovies = useSelector((state) => (state.matchedMovies ? state.matchedMovies : []));

  const handleClick = () => {
    history.push('/home');
  };

  if (partner && matchedMovies.length == 0) {
    return (
      <div className='session-container'>
        <SessionHeader />
        <MovieCard />
      </div>
    );
  } else if (partner && matchedMovies.length > 0) {
    return <MatchedMovies matchedMovies={matchedMovies} />;
  } else if (!partner && matchedMovies && matchedMovies.length == 0) {
    return (
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
  }
};

export default Session;
