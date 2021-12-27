import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../constants/action';

export const setPaginationCurrentPage = createAction(
  ActionType.SetPaginationCurrentPage,
  (currentPage: number) => ({
    payload: {
      currentPage,
    },
  }),
);

export const setPaginationMaxPage = createAction(
  ActionType.SetPaginationMaxPage,
  (maxPage: number) => ({
    payload: {
      maxPage,
    },
  }),
);
