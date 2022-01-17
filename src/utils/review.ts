import { ReviewGet } from '../types/review';

export const sortByDate = (reviews: ReviewGet[]) => {
  const copiedReviews = [...reviews];

  copiedReviews.sort((reviewA, reviewB) => {
    const dateA = new Date(reviewA.createAt);
    const dateB = new Date(reviewB.createAt);

    if (dateA === dateB) {
      return 0;
    }

    return dateA < dateB ? 1 : -1;
  });

  return copiedReviews;
};
