import { GuitarType, StringCountType } from '../types/guitar';
import { getGraterThanOrEqualQuery, getLessThanOrEqualQuery } from '../utils/query';
import { GuitarTypeValue } from './guitar';

export const FilterParameter = {
  MinPrice:  getGraterThanOrEqualQuery('price'),
  MaxPrice:  getLessThanOrEqualQuery('price'),
  Type: 'type',
  StringCount: 'stringCount',
} as const;

export const AvailableStringCounts: {
  [key in GuitarType]: StringCountType[]
} = {
  [GuitarTypeValue.Acoustic]: [6, 7, 12],
  [GuitarTypeValue.Electric]: [4, 6, 7],
  [GuitarTypeValue.Ukulele]: [4],
};
