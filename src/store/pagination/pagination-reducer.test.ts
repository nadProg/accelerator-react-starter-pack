import { datatype } from 'faker';
import { UNKNOWN_ACTION } from '../../constants/action';
import { CATALOG_MIN_PAGE } from '../../constants/pagination';
import {
  setPaginationCurrentPage,
  setPaginationMaxPage
} from './pagination-actions';
import { paginationInitialState } from './pagination-initial-state';
import { paginationReducer } from './pagination-reducer';

describe('Reducer: Pagination', () => {
  it('without additional parameters should return initial state', () => {
    expect(paginationReducer(void 0, UNKNOWN_ACTION)).toEqual(
      paginationInitialState,
    );
  });

  it('should set pagination max page', () => {
    const mockMaxPage = datatype.number();
    expect(
      paginationReducer(
        paginationInitialState,
        setPaginationMaxPage(mockMaxPage),
      ),
    ).toEqual({
      ...paginationInitialState,
      maxPage: mockMaxPage,
    });
  });

  it('should set valid pagination current page', () => {
    const currentPage = 5;
    const mockInitialState = {
      currentPage: 1,
      maxPage: 10,
    };
    expect(
      paginationReducer(mockInitialState, setPaginationCurrentPage(currentPage)),
    ).toEqual({
      ...mockInitialState,
      currentPage,
    });
  });

  it('should not set pagination current page more than maxPage', () => {
    const invalidCurrentPage = 20;
    const maxPage = 10;
    const mockInitialState = {
      currentPage: 5,
      maxPage: maxPage,
    };
    expect(
      paginationReducer(
        mockInitialState,
        setPaginationCurrentPage(invalidCurrentPage),
      ),
    ).toEqual({
      ...mockInitialState,
      currentPage: maxPage,
    });
  });

  it('should not set pagination current page less than min constant value', () => {
    const invalidCurrentPage = 0;
    const mockInitialState = {
      currentPage: 5,
      maxPage: 10,
    };
    expect(
      paginationReducer(
        mockInitialState,
        setPaginationCurrentPage(invalidCurrentPage),
      ),
    ).toEqual({
      ...mockInitialState,
      currentPage: CATALOG_MIN_PAGE,
    });
  });
});
