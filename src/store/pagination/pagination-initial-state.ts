import { CATALOG_MIN_PAGE } from '../../constants/pagination';

type PaginationState = {
  currentPage: number,
  maxPage: number,
};

export const paginationInitialState: PaginationState = {
  currentPage: CATALOG_MIN_PAGE,
  maxPage: CATALOG_MIN_PAGE,
};
