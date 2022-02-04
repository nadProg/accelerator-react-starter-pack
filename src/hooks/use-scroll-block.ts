import { useEffect } from 'react';

const blockScroll = () => {
  const clientWidthBeforeHidden = document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  const clientWidthAfterHidden = document.documentElement.clientWidth;
  const paddingRight = clientWidthAfterHidden - clientWidthBeforeHidden;
  document.body.style.paddingRight = `${paddingRight}px`;
};

const unblockScroll = (transitionTime: number) => {
  setTimeout(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, transitionTime);
};

export const useScrollBlock = (isActive: boolean, transitionTime = 600) => {
  useEffect(() => {
    if (isActive) {
      blockScroll();
      return;
    }

    unblockScroll(transitionTime);
  }, [isActive]);

  useEffect(() => () => {
    unblockScroll(transitionTime);
  }, []);
};
