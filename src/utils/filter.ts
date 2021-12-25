import { AvailableStringCounts } from '../constants/filter';
import { GuitarType, StringCountType } from '../types/guitar';

export const getAvailableStringCounts = (guitarTypes: GuitarType[]): StringCountType[] => {
  let array: StringCountType[] = [];

  guitarTypes.forEach((type) => {
    array = [ ...array, ...AvailableStringCounts[type]];
  });

  return Array.from(new Set(array));
};
