export const GuitarType = {
  Electric: 'electric',
  Acoustic: 'acoustic',
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
} as const;

export const APIRoute = {
  CatalogGuitars: () => '/guitars?_embed=comments&_limit=9&_start=0',
} as const;

export const AppRoute = {
  Root: () => '/',
  Catalog: () => '/catalog',
  CatalogPage: (pageNumber?: number) => `/catalog/${Number.isFinite(pageNumber) ? `page_${pageNumber}` : ':page'}`,
  Card: (id: number | string = ':id') => `/card/${id}`,
  Basket: () => '/basket',
  NotFound: () => '/404',
} as const;
