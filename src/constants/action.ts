export const ActionType = {
  SetCatalogGuitars: 'catalogGuitars/setData',
  SetCatalogGuitarsStatus: 'catalogGuitars/setStatus',
  SetCurrentGuitar: 'currentGuitar/setData',
  SetCurrentGuitarStatus: 'currentGuitar/setStatus',
  SetFoundGuitars: 'foundGuitars/setData',
  SetAllGuitars: 'allGuitars/setData',
  SetSortType: 'sort/setType',
  SetSortOrder: 'sort/setOrder',
  SetFilterMinPrice: 'filter/setMinPrice',
  SetFilterMaxPrice: 'filter/setMaxPrice',
  AddFilterGuitarType: 'filter/addGuitarType',
  RemoveFilterGuitarType: 'filter/removeGuitarType',
  AddFilterStringCount: 'filter/addStringCount',
  RemoveFilterStringCount: 'filter/removeStringCount',
  SetPaginationCurrentPage: 'pagination/setCurrentPage',
  SetPaginationMaxPage: 'pagination/setMaxPage',
} as const;

export const UNKNOWN_ACTION = {
  type: 'UNKNOWN_ACTION',
} as const;
