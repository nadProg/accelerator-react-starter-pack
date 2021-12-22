import { FetchStatus } from '../../constants/constants';
import { FetchedData, Guitar } from '../../types/types';

export type GuitarsState = {
  catalogGuitars: FetchedData<Guitar[]>,
};

export const guitarsInitialState: GuitarsState = {
  catalogGuitars: {
    data: null,
    status: FetchStatus.Idle,
  },
};
