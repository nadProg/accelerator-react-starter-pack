import { Order, Type } from '../constants/sort';
import { ValuesOf } from './common';

export type OrderType = ValuesOf<typeof Order>

export type SortType = ValuesOf<typeof Type>
