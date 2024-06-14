import React from 'react';
import { classnames } from '../../lib';

const JobTypeLabel = ({ type }) => {
  const colors = {
    Remote: 'bg-purple-500',
    'On-Site': 'bg-yellow-500',
  };
  return (
    <span
      className={classnames(
        'rounded-md text flex items-center px-1.5 text-sm font-semibold border border-gray-500',
        colors[type]
      )}
      style={{ maxHeight: '40px' }}
    >
      <p className="text-white">{type}</p>
    </span>
  );
};

export default JobTypeLabel;
