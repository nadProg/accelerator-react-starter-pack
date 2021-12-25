import { AvailableStringCounts } from '../constants/filter';
import { STRING_COUNT_VALUES } from '../constants/guitar';
import { GuitarType, StringCountType } from '../types/guitar';

export const getAvailableStringCounts = (guitarTypes: GuitarType[]): StringCountType[] => {
  if (!guitarTypes.length) {
    return [ ...STRING_COUNT_VALUES];
  }

  let stringCounts: StringCountType[] = [];

  guitarTypes.forEach((type) => {
    stringCounts = [ ...stringCounts, ...AvailableStringCounts[type]];
  });

  return Array.from(new Set(stringCounts));
};
