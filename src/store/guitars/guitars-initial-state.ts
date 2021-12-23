import { FetchStatus } from '../../constants/common';
import { FetchedData } from '../../types/common';
import { Guitar, GuitarWithComments } from '../../types/guitar';

export type GuitarsState = {
  catalogGuitars: FetchedData<GuitarWithComments[]>,
  currentGuitar: FetchedData<GuitarWithComments>,
  foundGuitars: {
    data: Guitar[] | null,
  },
};

export const guitarsInitialState: GuitarsState = {
  catalogGuitars: {
    data: null,
    status: FetchStatus.Idle,
  },
  currentGuitar: {
    data: null,
    status: FetchStatus.Idle,
  },
  foundGuitars: {
    data: null,
  },
};
