import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearState } from '../store';

const MatchedMovies = ({ matchedMovies }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div
      className='matched-movies-component-wrapper'
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <img style={{ marginTop: '100px', maxWidth: '538px', maxHeight: '168px' }} src='/images/WSWW.jpg'></img>
      <div className='matched-movies-component'>
        <div style={{ textAlign: 'center' }}>Here are your matched movies!</div>
        <div
          className='back-button'
          style={{ width: '80%', marginTop: '40px' }}
          onClick={() => {
            dispatch(clearState());
            history.push('/home');
          }}
        >
          Back to Home Screen
        </div>
        {matchedMovies.map((movie, idx) => (
          <MatchedMoviesCard key={idx} movie={movie} />
        ))}
      </div>
    </div>
  );
};

const MatchedMoviesCard = ({ movie }) => {
  return (
    <div className='matched-movie-card'>
      <div className='matched-movie-title'>{movie.title}</div>

      <img className='movie-poster' src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.imageUrl}`} />
    </div>
  );
};

export default MatchedMovies;
