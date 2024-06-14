import React from 'react';

const ResultsFound = ({ count }) => {
  return (
    <div className="flex flex-wrap gap-2 items-center p-4">
      <div className="flex gap-2 items-center flex-grow text-gray-500">
        Results found: <strong>{count}</strong>
      </div>
    </div>
  );
};

export default ResultsFound;
