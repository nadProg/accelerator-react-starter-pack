import { Query } from '../constants/constants';
import { Guitar } from '../types/types';

export const getLikeQuery = (value: keyof Guitar): string => `${value}${Query.Like}`;
