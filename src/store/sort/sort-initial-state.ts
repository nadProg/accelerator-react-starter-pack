import { Order, Type } from '../../constants/sort';
import { OrderType, SortType } from '../../types/sort';

type SortState = {
  type: SortType,
  order: OrderType
}

export const initialSortState: SortState = {
  type: Type.Price,
  order: Order.Ascending,
};
