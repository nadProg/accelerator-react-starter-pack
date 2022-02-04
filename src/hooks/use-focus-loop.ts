import { RefObject, useEffect, useRef } from 'react';

export const useFocusLoop = <T extends HTMLElement>(isActive: boolean, rootRef: RefObject<T>, transitionTime = 100) => {
  const firstNodeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const rootNode = rootRef.current;

    if (!rootNode || !isActive) {
      return;
    }

    const focusableNodes = rootNode.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

    if (!focusableNodes.length) {
      return;
    }

    const firstNode = focusableNodes[0] as HTMLElement;
    firstNodeRef.current = firstNode;

    const lastNode = focusableNodes[focusableNodes.length - 1] as HTMLElement;

    const handleLastNodeBlur = () => {
      firstNode.focus();
    };

    lastNode.addEventListener('blur', handleLastNodeBlur);

    setTimeout(handleLastNodeBlur, transitionTime);

    return () => {
      lastNode.removeEventListener('blur', handleLastNodeBlur);
    };
  }, [isActive, rootRef, transitionTime]);
};
