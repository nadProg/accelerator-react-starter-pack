import { FetchStatus } from '../constants/common';
import { FetchStatusType } from '../types/common';

export const isFetchIdle = (status: FetchStatusType): boolean => status === FetchStatus.Idle;

export const isFetchLoading = (status: FetchStatusType): boolean => status === FetchStatus.Loading;

export const isFetchNotReady = (status: FetchStatusType): boolean => status === FetchStatus.Idle || status === FetchStatus.Loading;

export const isFetchError = (status: FetchStatusType): boolean => status === FetchStatus.Failed;
