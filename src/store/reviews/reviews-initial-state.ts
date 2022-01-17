import { FetchStatus } from '../../constants/common';
import { FetchStatusType } from '../../types/common';

export type ReviewsState = {
  newReview: {
    status: FetchStatusType
  },
};

export const reviewsInitialState: ReviewsState = {
  newReview: {
    status: FetchStatus.Idle,
  },
};
