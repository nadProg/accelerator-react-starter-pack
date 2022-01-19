import { useCallback, useEffect } from 'react';
import { KeyCode } from '../constants/common';

export const useEscape = (isActive: boolean, callback: () => void) => {
  const handleWindowKeydown = useCallback((evt : KeyboardEvent) => {
    if (evt.code === KeyCode.Escape) {
      callback();
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      window.addEventListener('keydown', handleWindowKeydown);
    } else {
      window.removeEventListener('keydown', handleWindowKeydown);
    }

    return () => {
      window.removeEventListener('keydown', handleWindowKeydown);
    };
  }, [isActive]);
};
