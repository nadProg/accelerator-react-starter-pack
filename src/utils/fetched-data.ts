import { FetchStatus } from '../constants/constants';
import { FetchStatusType } from '../types/types';

export const isFetchIdle = (status: FetchStatusType): boolean => status === FetchStatus.Idle;

export const isFetchNotReady = (status: FetchStatusType): boolean => status === FetchStatus.Idle || status === FetchStatus.Loading;

export const isFetchError = (status: FetchStatusType): boolean => status === FetchStatus.Failed;

export const isFetchSuccess = (status: FetchStatusType): boolean => status === FetchStatus.Succeeded;
