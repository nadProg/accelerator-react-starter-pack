import { datatype } from 'faker';
import { UNKNOWN_ACTION } from '../../constants/action';
import { GuitarTypeValue, STRING_COUNT_VALUES } from '../../constants/guitar';
import { addFilterGuitarType, addFilterStringCount, removeFilterGuitarType, removeFilterStringCount, setFilterMaxPrice, setFilterMinPrice } from './filter-actions';
import { filterInitialState } from './filter-initial-state';
import { filterReducer } from './filter-reducer';

describe('Reducer: Filter', () => {
  it('without additional parameters should return initial state', () => {
    expect(filterReducer(void 0 , UNKNOWN_ACTION))
      .toEqual(filterInitialState);
  });

  it('should set filter min price', () => {
    const mockMinPrice = datatype.number();

    expect(filterReducer(filterInitialState, setFilterMinPrice(mockMinPrice)))
      .toEqual({
        ...filterInitialState,
        price: {
          ...filterInitialState.price,
          min: mockMinPrice,
        },
      });
  });

  it('should set filter max price', () => {
    const mockMaxPrice = datatype.number();

    expect(filterReducer(filterInitialState, setFilterMaxPrice(mockMaxPrice)))
      .toEqual({
        ...filterInitialState,
        price: {
          ...filterInitialState.price,
          max: mockMaxPrice,
        },
      });
  });

  it('should add filter guitar type', () => {
    const mockGuitarType = GuitarTypeValue.Acoustic;
    const mockInitialState: typeof filterInitialState = {
      ...filterInitialState,
      types: [GuitarTypeValue.Electric],
    };

    expect(filterReducer(mockInitialState, addFilterGuitarType(mockGuitarType)))
      .toEqual({
        ...filterInitialState,
        types: [...mockInitialState.types, mockGuitarType],
      });
  });

  it('should remove filter guitar type', () => {
    const mockGuitarType = GuitarTypeValue.Acoustic;
    const mockInitialState: typeof filterInitialState = {
      ...filterInitialState,
      types: [GuitarTypeValue.Electric, mockGuitarType],
    };

    expect(filterReducer(mockInitialState, removeFilterGuitarType(mockGuitarType)))
      .toEqual({
        ...filterInitialState,
        types:  [GuitarTypeValue.Electric],
      });
  });

  it('should add filter string count', () => {
    const mockStringCount = STRING_COUNT_VALUES[1];
    const mockInitialState: typeof filterInitialState = {
      ...filterInitialState,
      stringCounts: [STRING_COUNT_VALUES[2]],
    };

    expect(filterReducer(mockInitialState, addFilterStringCount(mockStringCount)))
      .toEqual({
        ...filterInitialState,
        stringCounts: [...mockInitialState.stringCounts, mockStringCount],
      });
  });

  it('should remove filter string count', () => {
    const mockStringCount = STRING_COUNT_VALUES[1];
    const mockInitialState: typeof filterInitialState = {
      ...filterInitialState,
      stringCounts: [STRING_COUNT_VALUES[2], mockStringCount],
    };

    expect(filterReducer(mockInitialState, removeFilterStringCount(mockStringCount)))
      .toEqual({
        ...filterInitialState,
        stringCounts: [STRING_COUNT_VALUES[2]],
      });
  });
});
