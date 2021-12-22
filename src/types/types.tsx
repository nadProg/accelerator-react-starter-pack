import { GuitarType } from '../components/constants/constants';

export type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: ValuesOf<typeof GuitarType>
  description: string,
  previewImg: string,
  stringCount: 4 | 6 | 7 | 12,
  rating: number,
  price: number,
  comments?: Comment[],
}

export type Comment = {
  id: string,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: 1,
};

export type ValuesOf<T> = T[keyof T];
