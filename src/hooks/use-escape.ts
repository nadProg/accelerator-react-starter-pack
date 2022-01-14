import { useCallback, useEffect } from 'react';
import { KeyCode } from '../constants/common';

export const useEscape = (callback: () => void) => {
  const handleWindowKeydown = useCallback((evt : KeyboardEvent) => {
    if (evt.code === KeyCode.Escape) {
      callback();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleWindowKeydown);

    return () => {
      window.removeEventListener('keydown', handleWindowKeydown);
    };
  }, []);
};
