export const APIRoute = {
  Guitars: () => '/guitars',
  Guitar: (id: number | string) => `/guitars/${id}`,
  Reviews: () => '/comments',
} as const;

export const AppRoute = {
  Root: () => '/',
  Catalog: () => '/catalog',
  CatalogPage: (pageNumber?: number) => `/catalog/${Number.isFinite(pageNumber) ? `page_${pageNumber}` : ':page'}`,
  Card: (id: number | string = ':id') => `/card/${id}`,
  Cart: () => '/cart',
  NotFound: () => '/404',
} as const;
