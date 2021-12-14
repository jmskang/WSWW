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
          <img
            className='movie-poster'
            src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${currentMovie.imageUrl}`}
          ></img>
        </div>
        <div className='movie-information-wrapper'>
          <div className='movie-title'>{currentMovie.title}</div>
          <hr style={{ width: '85%', backgroundColor: 'black' }} />
          <div className='movie-genre-list'>{currentMovie.genreList.join(' | ')}</div>
          <div className='movie-rating'>Rating: {currentMovie.rating}/10</div>
          <hr style={{ width: '85%', backgroundColor: 'black' }} />
          <div className='movie-desc'>{currentMovie.description}</div>
        </div>
        <div className='pick-movie-buttons-wrapper'>
          <img className='thumbs-up' onClick={handleDislike} src='/images/thumbs-up.svg'></img>
          <img className='thumbs-down' onClick={handleLike} src='/images/thumbs-down.svg'></img>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        Waiting for your partner to finish :)
        <div className='loader' />
      </div>
    );
  }
};

export default MovieCard;
