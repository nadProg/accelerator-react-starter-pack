import { commentsInitialState } from '../store/comments/comments-initial-state';
import { filterInitialState } from '../store/filter/filter-initial-state';
import { guitarsInitialState } from '../store/guitars/guitars-initial-state';
import { paginationInitialState } from '../store/pagination/pagination-initial-state';
import { sortInitialState } from '../store/sort/sort-initial-state';
import { State } from '../types/store';

export const createMockState = (): State => ({
  guitars: {
    ...guitarsInitialState,
  },
  sort: {
    ...sortInitialState,
  },
  filter: {
    ...filterInitialState,
  },
  pagination: {
    ...paginationInitialState,
  },
  comments: {
    ...commentsInitialState,
  },
});
