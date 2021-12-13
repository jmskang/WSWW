import React from 'react';
import { useSelector } from 'react-redux';

const MovieCard = ({ currentMovie }) => {
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
    </div>
  );
};

export default MovieCard;
