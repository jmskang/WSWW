import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import socket from '../socket';

const MovieCard = () => {
  const moviesList = useSelector((state) => (state.sessionState ? state.sessionState.sessionMovies : []));
  const clientId = useSelector((state) => (state.userId ? state.userId : null));
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const roomCode = useSelector((state) => state.roomName);

  let currentMovie = moviesList[currentMovieIndex];

  const handleDislike = () => {
    socket.emit('likeDislike', clientId, false, roomCode);
    setCurrentMovieIndex(currentMovieIndex + 1);
  };
  const handleLike = () => {
    socket.emit('likeDislike', clientId, true, roomCode);
    setCurrentMovieIndex(currentMovieIndex + 1);
  };

  if (currentMovie != undefined) {
    return (
      <div className='movie-card-wrapper'>
        <div className='movie-poster-wrapper'>
          <img></img>
        </div>
        <div className='movie-information-wrapper'>
          <div>{currentMovie.title}</div>
          <div>{currentMovie.genreList.join(' ')}</div>
          <div>Rating: {currentMovie.rating}/10</div>
          <div>{currentMovie.description}</div>
        </div>
        <div className='pick-movie-buttons-wrapper'>
          <div onClick={handleDislike}>I don't want to watch!</div>
          <div onClick={handleLike}>I want to watch!</div>
        </div>
      </div>
    );
  } else {
    return <div>Waiting for your partner to finish :)</div>;
  }
};

export default MovieCard;
