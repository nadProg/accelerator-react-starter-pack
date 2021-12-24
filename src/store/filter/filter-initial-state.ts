import { GuitarType, StringCountType } from '../../types/guitar';

type FilterState = {
  price: {
    min: number | '';
    max: number | '';
  };
  types: GuitarType[];
  stringCounts: StringCountType[];
};

export const filterInitialState: FilterState = {
  price: {
    min: '',
    max: '',
  },
  types: [],
  stringCounts: [],
};
