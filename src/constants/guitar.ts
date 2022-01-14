import { GuitarTabType, GuitarType } from '../types/guitar';

export const STRING_COUNT_VALUES = [4 , 6 , 7 , 12] as const;

export const GuitarTypeValue = {
  Acoustic: 'acoustic',
  Electric: 'electric',
  Ukulele :'ukulele',
} as const;

export const HumanizedGuitar: {
  [key in GuitarType]: string
} = {
  [GuitarTypeValue.Acoustic]: 'Акустическая гитара',
  [GuitarTypeValue.Electric]: 'Электрогитара',
  [GuitarTypeValue.Ukulele]: 'Укулеле',
} as const;

export const HumanizedGuitars: {
  [key in GuitarType]: string
} = {
  [GuitarTypeValue.Acoustic]: 'Акустические гитары',
  [GuitarTypeValue.Electric]: 'Электрогитары',
  [GuitarTypeValue.Ukulele]: 'Укулеле',
} as const;

export const GuitarTab = {
  Characteristics: 'characteristics',
  Description: 'description',
} as const;

export const HumanizedGuitarTab: {
  [key in GuitarTabType]: string
} = {
  [GuitarTab.Characteristics]: 'Характеристики',
  [GuitarTab.Description]: 'Описание',
} as const;
