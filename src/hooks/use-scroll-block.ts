import { useEffect } from 'react';

const blockScroll = () => {
  document.body.style.overflow = 'hidden';
};

const unblockScroll = () => {
  document.body.style.overflow = '';
};

export const useScrollBlock = () => {
  useEffect(() => {
    blockScroll();

    return () => {
      unblockScroll();
    };
  }, []);
};
