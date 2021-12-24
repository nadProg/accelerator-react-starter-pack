import { getGraterThanOrEqualQuery, getLessThanOrEqualQuery, getLikeQuery } from '../utils/query';

export const COMMENTS = 'comments';

export const Query = {
  Embed: '_embed',
  Limit: '_limit',
  Start: '_start',
  Sort: '_sort',
  Order: '_order',
  Like: '_like',
  GraterThanOrEqual: '_gte',
  LessThanOrEqual: '_lte',
} as const;

export const NAME_LIKE_QUERY = getLikeQuery('name');

export const PriceQuery = {
  Min: getGraterThanOrEqualQuery('price'),
  Max: getLessThanOrEqualQuery('price'),
};
