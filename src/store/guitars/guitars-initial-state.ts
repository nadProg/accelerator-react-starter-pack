import { FetchStatus } from '../../constants/common';
import { FetchedData } from '../../types/common';
import { Guitar, GuitarWithReviews } from '../../types/guitar';

export type GuitarsState = {
  catalogGuitars: FetchedData<GuitarWithReviews[]>,
  currentGuitar: FetchedData<GuitarWithReviews>,
  foundGuitars: {
    data: Guitar[] | null,
  },
  allGuitars: {
    data: Guitar[] | null,
  }
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
  allGuitars: {
    data: null,
  },
};
