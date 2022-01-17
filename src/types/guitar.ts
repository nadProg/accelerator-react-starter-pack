import { GuitarTab, GuitarTypeValue, STRING_COUNT_VALUES } from '../constants/guitar';
import { ReviewGet } from './review';
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

export type GuitarWithReviews = Guitar & {
  comments: ReviewGet[];
}

export type GuitarTabType =  ValuesOf<typeof GuitarTab>;
