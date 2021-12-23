import { Direction, FetchStatus } from '../constants/common';

export type ValuesOf<T> = T[keyof T];

export type FetchedData<T = any> = {
  data: T | null;
  status: FetchStatusType;
};

export type FetchStatusType = ValuesOf<typeof FetchStatus>;

export type DirectionType = ValuesOf<typeof Direction>;

export type ParamsWithId = {
  [key: string]: string;
  id: string;
};
