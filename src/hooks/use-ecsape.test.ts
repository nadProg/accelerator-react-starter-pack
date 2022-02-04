import { useEscape } from './use-escape';
import { renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import { KeyCode } from '../constants/common';

describe('Hook: useEscape', () => {
  it('should return correct result', () => {
    const mockHandleEscape = jest.fn();

    const { result } = renderHook(() => {
      useEscape(true, mockHandleEscape);
    });

    expect(result.current).not.toBeDefined();
  });

  it('should handle keydown correctly', () => {
    const mockHandleEscape = jest.fn();

    fireEvent.keyDown(document.body, {
      code: KeyCode.Escape,
    });

    fireEvent.keyDown(document.body, {
      code: KeyCode.Enter,
    });

    expect(mockHandleEscape).not.toHaveBeenCalled();

    const { unmount } = renderHook(() => {
      useEscape(true, mockHandleEscape);
    });

    fireEvent.keyDown(document.body, {
      code: KeyCode.Escape,
    });

    fireEvent.keyDown(document.body, {
      code: KeyCode.Escape,
    });

    fireEvent.keyDown(document.body, {
      code: KeyCode.Enter,
    });

    fireEvent.keyDown(document.body, {
      code: KeyCode.Enter,
    });

    expect(mockHandleEscape).toHaveBeenCalledTimes(2);

    unmount();

    fireEvent.keyDown(document.body, {
      code: KeyCode.Escape,
    });

    fireEvent.keyDown(document.body, {
      code: KeyCode.Enter,
    });

    expect(mockHandleEscape).toHaveBeenCalledTimes(2);
  });
});
