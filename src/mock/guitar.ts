import { datatype, lorem } from 'faker';
import { GuitarTypeValue } from '../constants/guitar';
import { ValuesOf } from '../types/common';
import { Guitar, GuitarWithComments, StringCountType } from '../types/guitar';
import { createArrayOfObjects } from '../utils/common';
import { createMockComment } from './comment';

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

export const createMockGuitarWithComments = (commentsAmount = 1): GuitarWithComments => ({
  ...createMockGuitar(),
  comments: createArrayOfObjects(createMockComment, commentsAmount),
});
