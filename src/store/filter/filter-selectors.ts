import { createSelector } from '@reduxjs/toolkit';
import { GuitarType, StringCountType } from '../../types/guitar';
import { State } from '../../types/store';
import { getAllGuitarsData } from '../guitars/guitars-selectors';

export const getFilterMinPrice = ({ filter }: State): number | '' =>
  filter.price.min;

export const getFilterMaxPrice = ({ filter }: State): number | '' =>
  filter.price.max;

export const getFilterTypes = ({ filter }: State): GuitarType[] => filter.types;

export const getFilterStringCounts = ({ filter }: State): StringCountType[] =>
  filter.stringCounts;

export const getFilterPriceLimits = createSelector(
  [getAllGuitarsData],
  (guitars): { min: number | ''; max: number | '' } => {
    if (!guitars || !guitars.length) {
      return {
        min: '',
        max: '',
      };
    }

    let min = guitars[0].price;
    let max = guitars[0].price;

    guitars.forEach(({ price }) => {
      if (price < min) {
        min = price;
        return;
      }

      if (price > max) {
        max = price;
      }
    });

    return { min, max };
  },
);
