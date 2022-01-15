export const APIRoute = {
  CatalogGuitars: () => '/guitars',
  Guitar: (id: number | string) => `/guitars/${id}`,
  Comment: () => '/comments',
} as const;

export const AppRoute = {
  Root: () => '/',
  Catalog: () => '/catalog',
  CatalogPage: (pageNumber?: number) => `/catalog/${Number.isFinite(pageNumber) ? `page_${pageNumber}` : ':page'}`,
  Card: (id: number | string = ':id') => `/card/${id}`,
  Basket: () => '/basket',
  NotFound: () => '/404',
} as const;
