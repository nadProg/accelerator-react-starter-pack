import { datatype, lorem } from 'faker';
import { GuitarType } from '../constants/guitar';
import { ValuesOf } from '../types/common';
import { Guitar, GuitarWithComments, StringCountType } from '../types/guitar';

export const createMockGuitar = (): Guitar => ({
  id: datatype.number(),
  name: lorem.words(),
  vendorCode: lorem.word(),
  type: (lorem.word() as ValuesOf<typeof GuitarType>),
  description: lorem.text(),
  previewImg: lorem.word(),
  stringCount: (datatype.number() as StringCountType),
  rating: datatype.number(),
  price: datatype.number(),
});

export const createMockGuitarWithComments = (): GuitarWithComments => ({
  ...createMockGuitar(),
  comments: [],
});
