import { datatype } from 'faker';
import { CartItem } from '../types/cart';
import { createArrayOfObjects } from '../utils/common';
import { createMockGuitar } from './guitar';

export const createMockCartItem = (): CartItem => ({
  product: createMockGuitar(),
  quantity: datatype.number(98) + 1,
});

export const createMockCart = (count = 1) => ({
  items: createArrayOfObjects(createMockCartItem, count),
});
