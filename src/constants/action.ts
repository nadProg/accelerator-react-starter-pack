export const ActionType = {
  SetCatalogGuitars: 'catalogGuitars/setData',
  SetCatalogGuitarsStatus: 'catalogGuitars/setStatus',
  SetCurrentGuitar: 'currentGuitar/setData',
  SetCurrentGuitarStatus: 'currentGuitar/setStatus',
  SetFoundGuitars: 'foundGuitars/setData',
  SetSortType: 'sort/setType',
  SetSortOrder: 'sort/setOrder',
} as const;

export const UNKNOWN_ACTION = {
  type: 'UNKNOWN_ACTION',
} as const;
