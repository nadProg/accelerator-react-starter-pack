import { Query } from '../constants/query';
import { Guitar } from '../types/guitar';

export const getLikeQuery = (value: keyof Guitar): string => `${value}${Query.Like}`;

export const getGraterThanOrEqualQuery = (value: keyof Guitar): string => `${value}${Query.GraterThanOrEqual}`;

export const getLessThanOrEqualQuery = (value: keyof Guitar): string => `${value}${Query.LessThanOrEqual}`;
