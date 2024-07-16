import React from 'react';
import { classnames } from '../../lib';

const JobStatusPill = ({ status }) => {
  const colors = {
    Open: 'bg-green-500',
    'In progress': 'bg-blue-500',
    'In review': 'bg-gray-500',
    Complete: 'bg-blue-600',
  };
  return (
    <span
      className={classnames(
        'rounded-md text flex items-center px-1.5 text-sm font-semibold border border-gray-500',
        colors[status]
      )}
      style={{ maxHeight: '40px' }}
    >
      <p className="text-white">{status}</p>
    </span>
  );
};

export default JobStatusPill;
