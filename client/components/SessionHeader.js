import React from 'react';
import { useSelector } from 'react-redux';

const SessionHeader = () => {
  const partnerChoices = useSelector((state) => state.sessionState.partnerChoices);
  return (
    <div className='session-header'>
      <div className='session-header-text'>Your Partner's Progress</div>
      <div className='partner-progress-bar' style={{ display: 'flex', gap: '20px' }}>
        {partnerChoices.map((choice, idx) => (
          <div key={idx}> X </div>
        ))}
      </div>
    </div>
  );
};

export default SessionHeader;
