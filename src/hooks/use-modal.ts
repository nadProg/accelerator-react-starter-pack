import { RefObject } from 'react';
import { useEscape } from './use-escape';
import { useFocusLoop } from './use-focus-loop';
import { useScrollBlock } from './use-scroll-block';

export const useModal = <T extends HTMLElement>(rootRef: RefObject<T>, callback: () => void) => {
  useScrollBlock();
  useEscape(callback);
  useFocusLoop(rootRef);
};
