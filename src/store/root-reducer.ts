import { combineReducers } from '@reduxjs/toolkit';
import { commentsReducer } from './comments/comments-reducer';
import { filterReducer } from './filter/filter-reducer';
import { guitarsReducer } from './guitars/guitars-reducer';
import { paginationReducer } from './pagination/pagination-reducer';
import { sortReducer } from './sort/sort-reducer';

export const rootReducer = combineReducers({
  guitars: guitarsReducer,
  sort: sortReducer,
  filter: filterReducer,
  pagination: paginationReducer,
  comments: commentsReducer,
});
