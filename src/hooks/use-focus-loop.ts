import { RefObject, useEffect } from 'react';

export const useFocusLoop = <T extends HTMLElement>(isActive: boolean, rootRef: RefObject<T>) => {
  useEffect(() => {
    const rootNode = rootRef.current;

    if (!rootNode) {
      return;
    }

    const focusableNodes = rootNode.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

    const firstNode = focusableNodes[0] as HTMLElement;
    const lastNode = focusableNodes[focusableNodes.length - 1] as HTMLElement;

    const handleLastNodeBlur = () => {
      firstNode.focus();
    };

    if (isActive) {
      lastNode.addEventListener('blur', handleLastNodeBlur);
      firstNode.focus();
      console.log(firstNode);
    } else {
      lastNode.removeEventListener('blur', handleLastNodeBlur);
    }

    return () => {
      lastNode.removeEventListener('blur', handleLastNodeBlur);
    };
  }, [isActive, rootRef]);
};
