import { getLikeQuery } from '../utils/query';

export const GuitarType = {
  Acoustic: 'acoustic',
  Electric: 'electric',
  Ukulele :'ukulele',
} as const;

export const FetchStatus = {
  Idle: 'IDLE',
  Loading: 'LOADING',
  Succeeded: 'SUCCEEDED',
  Failed: 'FAILED',
} as const;

export const ActionType = {
  SetCatalogGuitars: 'catalogGuitars/setData',
  SetCatalogGuitarsStatus: 'catalogGuitars/setStatus',
  SetCurrentGuitar: 'currentGuitar/setData',
  SetCurrentGuitarStatus: 'currentGuitar/setStatus',
  SetFoundGuitars: 'foundGuitars/setData',
} as const;

export const APIRoute = {
  CatalogGuitars: () => '/guitars',
  Guitar: (id: number | string) => `/guitars/${id}`,
} as const;

export const AppRoute = {
  Root: () => '/',
  Catalog: () => '/catalog',
  CatalogPage: (pageNumber?: number) => `/catalog/${Number.isFinite(pageNumber) ? `page_${pageNumber}` : ':page'}`,
  Card: (id: number | string = ':id') => `/card/${id}`,
  Basket: () => '/basket',
  NotFound: () => '/404',
} as const;

export const HumanizedGuitarType = {
  [GuitarType.Acoustic]: 'Акустическая гитара',
  [GuitarType.Electric]: 'Электрогитара',
  [GuitarType.Ukulele]: 'Укулеле',
} as const;

export const CATALOG_PAGE_SIZE = 9;

export const COMMENTS = 'comments';

export const Query = {
  Embed: '_embed',
  Limit: '_limit',
  Start: '_start',
  Sort: '_sort',
  Order: '_order',
  Like: '_like',
} as const;

export const NAME_LIKE_QUERY = getLikeQuery('name');

export const KeyCode = {
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  Enter: 'Enter',
} as const;

export const SEARCH_LIST_LENGTH = 4;
