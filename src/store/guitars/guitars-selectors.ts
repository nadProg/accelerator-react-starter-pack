import { FetchStatusType, Guitar, State } from '../../types/types';

export const getCatalogGuitarsData = ({ guitars }: State): Guitar[] | null => guitars.catalogGuitars.data;

export const getCatalogGuitarsStatus = ({ guitars }: State): FetchStatusType => guitars.catalogGuitars.status;
