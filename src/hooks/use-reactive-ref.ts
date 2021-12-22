import { useEffect, useRef } from 'react';

export const useReactiveRef = <T>(state: T) => {
  const ref = useRef(state);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  return ref;
};
