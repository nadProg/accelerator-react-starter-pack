import { createReducer } from '@reduxjs/toolkit';
import { setNewCommentStatus } from './comments-actions';
import { commentsInitialState } from './comments-initial-state';

export const commentsReducer = createReducer(commentsInitialState, (builder) => {
  builder
    .addCase(setNewCommentStatus, (state, action) => {
      state.newComment.status = action.payload.status;
    });
});
