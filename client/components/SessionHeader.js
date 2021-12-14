import React from 'react';
import { useSelector } from 'react-redux';

const SessionHeader = () => {
  const partnerChoices = useSelector((state) => state.sessionState.partnerChoices);
  const moviesList = useSelector((state) => state.sessionState.sessionMovies);

  return (
    <div className='session-header'>
      <div className='session-header-text'>Your Partner's Progress</div>
      <div
        className='partner-progress-bar'
        style={{ display: 'flex', gap: '20px', justifyContent: 'space-between', marginTop: '10px' }}
      >
        {moviesList.map((movie, idx) =>
          partnerChoices[idx] == undefined ? (
            <span key={idx} className='dot'></span>
          ) : (
            <span key={idx} className='dot marked'></span>
          )
        )}
      </div>
    </div>
  );
};

export default SessionHeader;
