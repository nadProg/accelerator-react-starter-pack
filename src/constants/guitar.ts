export const GuitarType = {
  Acoustic: 'acoustic',
  Electric: 'electric',
  Ukulele :'ukulele',
} as const;

export const HumanizedGuitarType = {
  [GuitarType.Acoustic]: 'Акустическая гитара',
  [GuitarType.Electric]: 'Электрогитара',
  [GuitarType.Ukulele]: 'Укулеле',
} as const;

export const CATALOG_PAGE_SIZE = 9;

export const SEARCH_LIST_LENGTH = 4;
