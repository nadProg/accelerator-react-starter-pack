import { OrderType, SortType } from '../../types/sort';
import { State } from '../../types/store';

export const getSortType = ({ sort }: State): SortType | undefined => sort.type;

export const getSortOrder = ({ sort }: State): OrderType | undefined => sort.order;
