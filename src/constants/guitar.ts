export const STRING_COUNT_VALUES = [4 , 6 , 7 , 12] as const;

export const GuitarTypeValue = {
  Acoustic: 'acoustic',
  Electric: 'electric',
  Ukulele :'ukulele',
} as const;

export const HumanizedGuitar = {
  [GuitarTypeValue.Acoustic]: 'Акустическая гитара',
  [GuitarTypeValue.Electric]: 'Электрогитара',
  [GuitarTypeValue.Ukulele]: 'Укулеле',
} as const;

export const HumanizedGuitars = {
  [GuitarTypeValue.Acoustic]: 'Акустические гитары',
  [GuitarTypeValue.Electric]: 'Электрогитары',
  [GuitarTypeValue.Ukulele]: 'Укулеле',
} as const;
