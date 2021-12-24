import { FetchStatus } from '../constants/common';
import { Order, Type } from '../constants/sort';
import { State } from '../types/store';

export const createMockState = (): State => ({
  guitars: {
    catalogGuitars: {
      data: null,
      status: FetchStatus.Idle,
    },
    currentGuitar: {
      data: null,
      status: FetchStatus.Idle,
    },
    foundGuitars: {
      data: null,
    },
  },
  sort: {
    type: Type.Price,
    order: Order.Ascending,
  },
});
