import { debounce, DebouncedFunc } from 'lodash';
import { useEffect, useMemo } from 'react';
import { DEBOUNCE_TIME } from '../constants/common';

type AnyFunction = (...args: any) => any

export const useDebounce = <T extends AnyFunction>(callback: T, time: number = DEBOUNCE_TIME): DebouncedFunc<T> => {
  const debouncedCallback =  useMemo(() => debounce(callback, time), []);

  useEffect(() => () => {
    debouncedCallback.cancel();
  }, []);

  return debouncedCallback;
};

