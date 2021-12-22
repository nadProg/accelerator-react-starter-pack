import { createReducer } from '@reduxjs/toolkit';
import { setCatalogGuitars, setCatalogGuitarsStatus } from './guitars-actions';
import { guitarsInitialState } from './guitars-initial-state';

export const guitarsReducer = createReducer(guitarsInitialState, (builder) => {
  builder
    .addCase(setCatalogGuitars, (state, action) => {
      state.catalogGuitars.data = action.payload.catalogGuitars;
    })
    .addCase(setCatalogGuitarsStatus, (state, action) => {
      state.catalogGuitars.status = action.payload.status;
    });
});
