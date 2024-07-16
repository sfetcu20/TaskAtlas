import React, { useState } from 'react';
import Button from '../../components/Button';
import { axiosAuth, toaster } from '../../lib';
import { whoami } from '../../functions';

const ReviewSection = ({ postId, clientId, userId, refetch }) => {
  const [review, setReview] = useState('');
  const me = whoami();
  const isClient = me.me === clientId;

  const handleReviewSubmit = async () => {
    try {
      const reviewData = {
        post: postId,
        author: me.me,
        to: me.role == 'client' ? userId : clientId,
        comment: review,
      };

      await axiosAuth.post(`/reviews`, reviewData);
      refetch();
      toaster.success('Review has been submitted!');
      setReview('');
    } catch (err) {
      toaster.error('Error! Review has not been submitted!');
    }
  };

  return (
    <div className="flex flex-col w-full p-5 border-t border-gray-200 mt-5 bg-gray-100">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Leave a Review</h3>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="review" className="block text-sm font-medium text-gray-700">
            {isClient ? 'Leave a review for the user' : 'Leave a review for the client'}
          </label>
          <textarea
            id="review"
            name="review"
            rows="4"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <Button className="button full primary mt-4" onClick={handleReviewSubmit}>
          Submit Review
        </Button>
      </div>
    </div>
  );
};

export default ReviewSection;
