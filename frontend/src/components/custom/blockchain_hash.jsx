'use client';

import React from 'react';

const styles = `
  .hash-container {
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px 12px;
    display: inline-block;
    font-family: monospace;
  }

  .hash-display {
    color: #333;
    font-size: 14px;
  }
`;

const BlockchainHashDisplay = ({ hash }) => {
  const displayHash = `${hash.slice(0, 6)}...${hash.slice(-6)}`;

  return (
    <div className="hash-container">
      <span className="hash-display">{displayHash}</span>
    </div>
  );
};

export default BlockchainHashDisplay;