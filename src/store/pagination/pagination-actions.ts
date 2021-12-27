import { createAction } from '@reduxjs/toolkit';
import { Action } from '../../constants/action';

export const setPaginationCurrentPage = createAction(
  Action.SetPaginationCurrentPage,
  (currentPage: number) => ({
    payload: {
      currentPage,
    },
  }),
);

export const setPaginationMaxPage = createAction(
  Action.SetPaginationMaxPage,
  (maxPage: number) => ({
    payload: {
      maxPage,
    },
  }),
);
