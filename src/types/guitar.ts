import { GuitarTypeValue, STRING_COUNT_VALUES } from '../constants/guitar';
import { Comment } from './comment';
import { ValuesOf } from './common';

export type StringCountType = typeof STRING_COUNT_VALUES[number];

export type GuitarType = ValuesOf<typeof GuitarTypeValue>;

export type Guitar = {
  id: number;
  name: string;
  vendorCode: string;
  type: GuitarType;
  description: string;
  previewImg: string;
  stringCount: StringCountType;
  rating: number;
  price: number;
};

export type GuitarWithComments = Guitar & {
  comments: Comment[];
}
