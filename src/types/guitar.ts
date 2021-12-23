import { GuitarType } from '../constants/guitar';
import { Comment } from './comment';
import { ValuesOf } from './common';

export type StringCountType = 4 | 6 | 7 | 12;

export type Guitar = {
  id: number;
  name: string;
  vendorCode: string;
  type: ValuesOf<typeof GuitarType>;
  description: string;
  previewImg: string;
  stringCount: StringCountType;
  rating: number;
  price: number;
};

export type GuitarWithComments = Guitar & {
  comments: Comment[];
}
