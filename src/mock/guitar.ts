import { datatype, lorem } from 'faker';
import { GuitarTypeValue } from '../constants/guitar';
import { ValuesOf } from '../types/common';
import { Guitar, GuitarWithReviews, StringCountType } from '../types/guitar';
import { createArrayOfObjects } from '../utils/common';
import { createMockReview } from './review';

export const createMockGuitar = (): Guitar => ({
  id: datatype.number(),
  name: lorem.words(),
  vendorCode: lorem.word(),
  type: (lorem.word() as ValuesOf<typeof GuitarTypeValue>),
  description: lorem.text(),
  previewImg: lorem.word(),
  stringCount: (datatype.number() as StringCountType),
  rating: datatype.number(),
  price: datatype.number(),
});

export const createMockGuitarWithReviews = (reviewsAmount = 1): GuitarWithReviews => ({
  ...createMockGuitar(),
  comments: createArrayOfObjects(createMockReview, reviewsAmount),
});
