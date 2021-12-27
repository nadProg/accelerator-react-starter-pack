import { createReducer } from '@reduxjs/toolkit';
import { CATALOG_MIN_PAGE } from '../../constants/pagination';
import { setPaginationCurrentPage, setPaginationMaxPage } from './pagination-actions';
import { paginationInitialState } from './pagination-initial-state';

export const paginationReducer = createReducer(
  paginationInitialState,
  (builder) =>
    builder
      .addCase(setPaginationCurrentPage, (state, action) => {
        const { currentPage } = action.payload;

        if ( currentPage < CATALOG_MIN_PAGE ) {
          state.currentPage = CATALOG_MIN_PAGE;
          return;
        }

        if ( currentPage > state.maxPage ) {
          state.currentPage = state.maxPage;
          return;
        }

        state.currentPage = currentPage;
      })
      .addCase(setPaginationMaxPage, (state, action) => {
        state.maxPage = action.payload.maxPage;
      }),
);
