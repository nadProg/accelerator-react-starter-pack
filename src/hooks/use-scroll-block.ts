import { useEffect } from 'react';

const blockScroll = () => {
  const clientWidthBeforeHidden = document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  const clientWidthAfterHidden = document.documentElement.clientWidth;
  const paddingRight = clientWidthAfterHidden - clientWidthBeforeHidden;
  document.body.style.paddingRight = `${paddingRight}px`;
};

const unblockScroll = () => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

export const useScrollBlock = (isActive: boolean) => {
  useEffect(() => {
    if (isActive) {
      blockScroll();
    } else {
      unblockScroll();
    }

    return () => {
      unblockScroll();
    };
  }, [isActive]);
};
