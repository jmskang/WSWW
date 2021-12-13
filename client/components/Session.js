import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SessionHeader from './SessionHeader';
import MovieCard from './MovieCard';
import { likeDislikeMovie } from '../store';
import socket from '../socket';

const Session = () => {
  const dispatch = useDispatch();
  const moviesList = useSelector((state) => (state.sessionState ? state.sessionState.sessionMovies : []));
  const clientId = useSelector((state) => (state.userId ? state.userId : null));
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const partner = useSelector((state) => state.partner);
  const roomCode = useSelector((state) => state.roomName);

  const handleDislike = () => {
    socket.emit('likeDislike', clientId, false, roomCode);
    setCurrentMovieIndex(currentMovieIndex + 1);
  };
  const handleLike = () => {
    socket.emit('likeDislike', clientId, true, roomCode);
    setCurrentMovieIndex(currentMovieIndex + 1);
  };

  return partner ? (
    <div>
      <SessionHeader />
      <MovieCard currentMovie={moviesList[currentMovieIndex]} />
      <div className='pick-movie-buttons-wrapper'>
        <div onClick={handleDislike}>I don't want to watch!</div>
        <div onClick={handleLike}>I want to watch!</div>
      </div>
    </div>
  ) : (
    <div>
      <div className='room-code-header'>
        <h2>Your Room Code is: {roomCode}</h2>
        <div className='loading-icon-wrapper'>
          <h3>Waiting for your partner :)</h3>
        </div>
      </div>
    </div>
  );
};

export default Session;
