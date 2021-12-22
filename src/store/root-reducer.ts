import { combineReducers } from '@reduxjs/toolkit';
import { guitarsReducer } from './guitars/guitars-reducer';

export const rootReducer = combineReducers({
  guitars: guitarsReducer,
});
