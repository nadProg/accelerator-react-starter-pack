import { RefObject, useEffect } from 'react';

const CLIENT_HEIGHT_RATIO = 0.8;

export const useIntersection = <T extends HTMLElement>(ref: RefObject<T>, callback:() => void) => {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const handleWindowScroll = () => {
      if (!ref.current) {
        return;
      }

      const { clientHeight } = document.documentElement;
      const { bottom } = ref.current.getBoundingClientRect();

      const isIntersected = bottom < (clientHeight * CLIENT_HEIGHT_RATIO);

      if (isIntersected) {
        callback();
      }
    };


    window.addEventListener('scroll', handleWindowScroll);
    window.addEventListener('wheel', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      window.removeEventListener('wheel', handleWindowScroll);
    };
  }
  , []);
};
