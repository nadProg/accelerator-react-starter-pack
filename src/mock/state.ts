import { reviewsInitialState } from '../store/reviews/reviews-initial-state';
import { filterInitialState } from '../store/filter/filter-initial-state';
import { guitarsInitialState } from '../store/guitars/guitars-initial-state';
import { paginationInitialState } from '../store/pagination/pagination-initial-state';
import { sortInitialState } from '../store/sort/sort-initial-state';
import { State } from '../types/store';
import { cartInitialState } from '../store/cart/cart-initial-state';

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
  reviews: {
    ...reviewsInitialState,
  },
  cart: {
    ...cartInitialState,
  },
});
