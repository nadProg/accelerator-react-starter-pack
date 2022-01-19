import { useRef } from 'react';
import { useFocusLoop } from './use-focus-loop';
import { renderHook } from '@testing-library/react-hooks';

describe('Hook: useFocus', () => {
  it('should return correct result', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null);
      useFocusLoop(true, ref);
    });

    expect(result.current).not.toBeDefined();
  });
});
