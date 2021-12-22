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
} as const;

export const APIRoute = {
  CatalogGuitars: () => '/guitars?_embed=comments&_limit=9&_start=0',
  Guitar: (id: number | string) => `/guitars/${id}?_embed=comments`,
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
