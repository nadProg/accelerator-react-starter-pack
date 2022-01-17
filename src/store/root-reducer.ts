import { combineReducers } from '@reduxjs/toolkit';
import { reviewsReducer } from './reviews/reviews-reducer';
import { filterReducer } from './filter/filter-reducer';
import { guitarsReducer } from './guitars/guitars-reducer';
import { paginationReducer } from './pagination/pagination-reducer';
import { sortReducer } from './sort/sort-reducer';

export const rootReducer = combineReducers({
  guitars: guitarsReducer,
  sort: sortReducer,
  filter: filterReducer,
  pagination: paginationReducer,
  reviews: reviewsReducer,
});
