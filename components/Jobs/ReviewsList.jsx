import React from 'react';

const ReviewsList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews available.</p>;
  }
  function getRole(type) {
    if (type == 'user') return 'Freelancer';
    return 'Client';
  }
  return (
    <div className="flex flex-col w-full p-5 border-t border-gray-200 mt-5 bg-gray-100">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Reviews</h3>
      </div>
      {reviews.map((review) => (
        <div key={review._id} className="p-4 mb-4 border rounded bg-white">
          <div className="flex items-center mb-2">
            <p className="font-semibold">
              <span className="text-gray-500">{getRole(review.author.__t)}</span>:{'  '}{' '}
              {review.author.name}
            </p>
            <p className="ml-4 text-sm text-gray-600">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
