import { createReducer } from '@reduxjs/toolkit';
import { setNewReviewStatus } from './reviews-actions';
import { reviewsInitialState } from './reviews-initial-state';

export const reviewsReducer = createReducer(reviewsInitialState, (builder) => {
  builder
    .addCase(setNewReviewStatus, (state, action) => {
      state.newReview.status = action.payload.status;
    });
});
