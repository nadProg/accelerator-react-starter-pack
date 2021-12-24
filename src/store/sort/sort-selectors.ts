import { OrderType, SortType } from '../../types/sort';
import { State } from '../../types/store';

export const getSortType = ({ sort }: State): SortType => sort.type;

export const getSortOrder = ({ sort }: State): OrderType => sort.order;
