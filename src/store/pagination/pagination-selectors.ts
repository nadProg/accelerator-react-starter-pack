import { CATALOG_MIN_PAGE } from '../../constants/pagination';
import { State } from '../../types/store';

export const getPaginationMinPage = (): number => CATALOG_MIN_PAGE;

export const getPaginationCurrentPage = ({ pagination }: State): number =>
  pagination.currentPage;

export const getPaginationMaxPage = ({ pagination }: State): number =>
  pagination.maxPage;
