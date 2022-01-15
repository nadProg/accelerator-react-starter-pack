import { createReducer } from '@reduxjs/toolkit';
import {
  addCommentToCurrentGuitar,
  setAllGuitars,
  setCatalogGuitars,
  setCatalogGuitarsStatus,
  setCurrentGuitar,
  setCurrentGuitarStatus,
  setFoundGuitars
} from './guitars-actions';
import { guitarsInitialState } from './guitars-initial-state';

export const guitarsReducer = createReducer(guitarsInitialState, (builder) => {
  builder
    .addCase(setCatalogGuitars, (state, action) => {
      state.catalogGuitars.data = action.payload.catalogGuitars;
    })
    .addCase(setCatalogGuitarsStatus, (state, action) => {
      state.catalogGuitars.status = action.payload.status;
    })
    .addCase(setCurrentGuitar, (state, action) => {
      state.currentGuitar.data = action.payload.currentGuitar;
    })
    .addCase(setCurrentGuitarStatus, (state, action) => {
      state.currentGuitar.status = action.payload.status;
    })
    .addCase(setFoundGuitars, (state, action) => {
      state.foundGuitars.data = action.payload.foundGuitars;
    })
    .addCase(setAllGuitars, (state, action) => {
      state.allGuitars.data = action.payload.allGuitars;
    })
    .addCase(addCommentToCurrentGuitar, (state, action) => {
      state.currentGuitar.data?.comments.push(action.payload.comment);
    });
});
