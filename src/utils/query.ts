import { Query } from '../constants/query';
import { Guitar } from '../types/guitar';

export const getLikeQuery = (value: keyof Guitar): string => `${value}${Query.Like}`;
