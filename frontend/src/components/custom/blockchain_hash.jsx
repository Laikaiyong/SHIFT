'use client';

import React from 'react';

const BlockchainHashDisplay = ({ hash }) => {
  const displayHash = `${hash.slice(0, 4)}...${hash.slice(-4)}`;

  return (
    <div className='flex'>

      <span className='text-black'>{displayHash}</span>
    </div>
  );
};

export default BlockchainHashDisplay;