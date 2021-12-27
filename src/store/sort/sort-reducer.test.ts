import { UNKNOWN_ACTION } from '../../constants/action';
import { SortOrder, SortTypeValue } from '../../constants/sort';
import { setSortOrder, SetSortType } from './sort-actions';
import { sortInitialState } from './sort-initial-state';
import { sortReducer } from './sort-reducer';

const mockType = SortTypeValue.Rating;
const mockOrder = SortOrder.Descending;

describe('Reducer: Sort', () => {
  it('without additional parameters should return initial state', () => {
    expect(sortReducer(void 0 , UNKNOWN_ACTION))
      .toEqual(sortInitialState);
  });

  it('should set sort type', () => {
    expect(sortReducer(sortInitialState, SetSortType(mockType)))
      .toEqual({
        ...sortInitialState,
        type: mockType,
      });
  });

  it('should set sort order', () => {
    expect(sortReducer(sortInitialState, setSortOrder(mockOrder)))
      .toEqual({
        ...sortInitialState,
        order: mockOrder,
      });
  });
});
