import { SortOrder, SortTypeValue } from '../constants/sort';
import { ValuesOf } from './common';

export type OrderType = ValuesOf<typeof SortOrder>

export type SortType = ValuesOf<typeof SortTypeValue>
