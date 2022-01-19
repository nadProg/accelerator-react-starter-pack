import { useRef } from 'react';
import { useModal } from './use-modal';
import { renderHook } from '@testing-library/react-hooks';

describe('Hook: useModal', () => {
  it('should return correct result', () => {
    const mockCallback = jest.fn();

    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null);
      useModal(true ,ref, mockCallback);
    });

    expect(result.current).not.toBeDefined();
  });
});
