import { OrderType, SortType } from '../../types/sort';

type SortState = {
  type?: SortType,
  order?: OrderType
}

export const sortInitialState: SortState = {
  type: undefined,
  order: undefined,
};
