import React from 'react';
import isPostNew from '../../functions/is-post-new';

const NewJobLabel = ({ createdAt }) => {
  const isNew = isPostNew(createdAt);

  if (!isNew) return null;

  return (
    <span
      className="rounded-md flex items-center bg-green-500 px-4 text-sm font-semibold border border-gray-500"
      style={{ maxHeight: '40px' }}
    >
      <p className="text-white">NEW</p>
    </span>
  );
};

export default NewJobLabel;
