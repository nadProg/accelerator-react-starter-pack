import { createReducer } from '@reduxjs/toolkit';
import { setSortOrder, SetSortType } from './sort-actions';
import { initialSortState } from './sort-initial-state';

export const sortReducer = createReducer(initialSortState, (builder) => {
  builder
    .addCase(SetSortType, (state, action) => {
      state.type = action.payload.type;
    })
    .addCase(setSortOrder, (state, action) => {
      state.order = action.payload.order;
    });
});
