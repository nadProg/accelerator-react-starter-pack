import { CATALOG_MIN_PAGE, CATALOG_PAGINATION_SPAN } from '../../constants/pagination';

type PaginationState = {
  currentPage: number,
  maxPage: number,
};

export const paginationInitialState: PaginationState = {
  currentPage: CATALOG_MIN_PAGE,
  maxPage: CATALOG_PAGINATION_SPAN * 4,
};
