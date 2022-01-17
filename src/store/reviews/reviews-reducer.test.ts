import { UNKNOWN_ACTION } from '../../constants/action';
import { FetchStatus } from '../../constants/common';
import { setNewReviewStatus } from './reviews-actions';
import { reviewsInitialState } from './reviews-initial-state';
import { reviewsReducer } from './reviews-reducer';

describe('Reducer: Reviews', () => {
  it('without additional parameters should return initial state', () => {
    expect(reviewsReducer(void 0 , UNKNOWN_ACTION))
      .toEqual(reviewsInitialState);
  });

  it('should set new review fetch status', () => {
    expect(reviewsReducer(reviewsInitialState, setNewReviewStatus(FetchStatus.Succeeded)))
      .toEqual({
        ...reviewsInitialState,
        newReview: {
          status: FetchStatus.Succeeded,
        },
      });
  });
});
