import { UNKNOWN_ACTION } from '../../constants/action';
import { FetchStatus } from '../../constants/common';
import { createMockReview } from '../../mock/review';
import {
  createMockGuitar,
  createMockGuitarWithReviews
} from '../../mock/guitar';
import { createArrayOfObjects } from '../../utils/common';
import {
  addReviewToCurrentGuitar,
  setAllGuitars,
  setCatalogGuitars,
  setCatalogGuitarsStatus,
  setCurrentGuitar,
  setCurrentGuitarStatus,
  setFoundGuitars
} from './guitars-actions';
import { guitarsInitialState } from './guitars-initial-state';
import { guitarsReducer } from './guitars-reducer';

const mockCatalogGuitars = createArrayOfObjects(
  createMockGuitarWithReviews,
  10,
);
const mockCurrentGuitar = createMockGuitarWithReviews();
const mockFoundGuitars = createArrayOfObjects(createMockGuitar, 10);
const mockFetchStatus = FetchStatus.Loading;

describe('Reducer: Guitar', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitarsReducer(void 0, UNKNOWN_ACTION)).toEqual(guitarsInitialState);
  });

  it('should set catalog guitars data', () => {
    expect(
      guitarsReducer(guitarsInitialState, setCatalogGuitars(mockCatalogGuitars)),
    ).toEqual({
      ...guitarsInitialState,
      catalogGuitars: {
        ...guitarsInitialState.catalogGuitars,
        data: mockCatalogGuitars,
      },
    });
  });

  it('should set catalog guitars fetch status', () => {
    expect(
      guitarsReducer(
        guitarsInitialState,
        setCatalogGuitarsStatus(mockFetchStatus),
      ),
    ).toEqual({
      ...guitarsInitialState,
      catalogGuitars: {
        ...guitarsInitialState.catalogGuitars,
        status: mockFetchStatus,
      },
    });
  });

  it('should set current guitar data', () => {
    expect(
      guitarsReducer(guitarsInitialState, setCurrentGuitar(mockCurrentGuitar)),
    ).toEqual({
      ...guitarsInitialState,
      currentGuitar: {
        ...guitarsInitialState.currentGuitar,
        data: mockCurrentGuitar,
      },
    });
  });

  it('should add new review to current guitar', () => {
    const mockReview = createMockReview();
    const mockNewReview = createMockReview();
    const mockCurrentGuitarWithOneReview = {
      ...createMockGuitar(),
      comments: [mockReview],
    };

    const mockInitialState = {
      ...guitarsInitialState,
      currentGuitar: {
        ...guitarsInitialState.currentGuitar,
        data: mockCurrentGuitarWithOneReview,
      },
    };

    expect(
      guitarsReducer(
        mockInitialState,
        addReviewToCurrentGuitar(mockNewReview),
      ),
    ).toEqual({
      ...mockInitialState,
      currentGuitar: {
        ...mockInitialState.currentGuitar,
        data: {
          ...mockInitialState.currentGuitar.data,
          comments: [mockReview, mockNewReview],
        },
      },
    });
  });

  it('should set current guitar fetch status', () => {
    expect(
      guitarsReducer(
        guitarsInitialState,
        setCurrentGuitarStatus(mockFetchStatus),
      ),
    ).toEqual({
      ...guitarsInitialState,
      currentGuitar: {
        ...guitarsInitialState.currentGuitar,
        status: mockFetchStatus,
      },
    });
  });

  it('should set found guitars data', () => {
    expect(
      guitarsReducer(guitarsInitialState, setFoundGuitars(mockFoundGuitars)),
    ).toEqual({
      ...guitarsInitialState,
      foundGuitars: {
        ...guitarsInitialState.foundGuitars,
        data: mockFoundGuitars,
      },
    });
  });

  it('should set all guitars data', () => {
    expect(
      guitarsReducer(guitarsInitialState, setAllGuitars(mockFoundGuitars)),
    ).toEqual({
      ...guitarsInitialState,
      allGuitars: {
        ...guitarsInitialState.allGuitars,
        data: mockFoundGuitars,
      },
    });
  });
});
