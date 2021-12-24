import { combineReducers } from '@reduxjs/toolkit';
import { guitarsReducer } from './guitars/guitars-reducer';
import { sortReducer } from './sort/sort-reducer';

export const rootReducer = combineReducers({
  guitars: guitarsReducer,
  sort: sortReducer,
});
