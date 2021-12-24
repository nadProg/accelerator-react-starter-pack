import { filterInitialState } from '../store/filter/filter-initial-state';
import { guitarsInitialState } from '../store/guitars/guitars-initial-state';
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
});
