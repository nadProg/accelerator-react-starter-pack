import { FetchStatusType } from '../../types/common';
import { Guitar, GuitarWithReviews } from '../../types/guitar';
import { State } from '../../types/store';

export const getCatalogGuitarsData = ({ guitars }: State): GuitarWithReviews[] | null => guitars.catalogGuitars.data;

export const getCatalogGuitarsStatus = ({ guitars }: State): FetchStatusType => guitars.catalogGuitars.status;

export const getCurrentGuitarData = ({ guitars }: State): GuitarWithReviews | null => guitars.currentGuitar.data;

export const getCurrentGuitarStatus = ({ guitars }: State): FetchStatusType => guitars.currentGuitar.status;

export const getFoundGuitarsData = ({ guitars }: State): Guitar[] | null => guitars.foundGuitars.data;

export const getAllGuitarsData = ({ guitars }: State): Guitar[] | null => guitars.allGuitars.data;
