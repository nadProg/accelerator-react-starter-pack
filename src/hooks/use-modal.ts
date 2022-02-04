import { RefObject } from 'react';
import { useEscape } from './use-escape';
import { useFocusLoop } from './use-focus-loop';
import { useScrollBlock } from './use-scroll-block';

export const useModal = <T extends HTMLElement>(
  isActive: boolean,
  rootRef: RefObject<T>,
  callback: () => void,
) => {
  useScrollBlock(isActive);
  useEscape(isActive, callback);
  useFocusLoop(isActive, rootRef);
};
