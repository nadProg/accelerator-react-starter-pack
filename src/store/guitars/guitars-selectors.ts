import { FetchStatusType } from '../../types/common';
import { Guitar, GuitarWithComments } from '../../types/guitar';
import { State } from '../../types/store';

export const getCatalogGuitarsData = ({ guitars }: State): GuitarWithComments[] | null => guitars.catalogGuitars.data;

export const getCatalogGuitarsStatus = ({ guitars }: State): FetchStatusType => guitars.catalogGuitars.status;

export const getCurrentGuitarData = ({ guitars }: State): GuitarWithComments | null => guitars.currentGuitar.data;

export const getCurrentGuitarStatus = ({ guitars }: State): FetchStatusType => guitars.currentGuitar.status;

export const getFoundGuitarsData = ({ guitars }: State): Guitar[] | null => guitars.foundGuitars.data;
