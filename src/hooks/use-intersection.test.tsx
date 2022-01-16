import React, { useRef } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useIntersection } from './use-intersection';
import { fireEvent, render } from '@testing-library/react';

describe('Hook: useIntersection', () => {
  it('should return correct result', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null);
      const mockCallback = jest.fn();
      return useIntersection(ref, mockCallback);
    });

    expect(result.current).not.toBeDefined();
  });

  it('should handle callback when intersected', () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() => useRef<HTMLDivElement>(null));

    jest
      .spyOn(document.documentElement, 'clientHeight', 'get')
      .mockImplementation(() => 1000);

    render(<div ref={result.current} />);

    renderHook(() => useIntersection(result.current, mockCallback));

    fireEvent.scroll(window);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should not handle callback when no intersection', () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() => useRef<HTMLDivElement>(null));

    jest
      .spyOn(document.documentElement, 'clientHeight', 'get')
      .mockImplementation(() => 0);

    render(<div ref={result.current} />);

    renderHook(() => useIntersection(result.current, mockCallback));

    fireEvent.scroll(window);

    expect(mockCallback).toHaveBeenCalledTimes(0);
  });

  it('should not handle callback when no ref', () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() => useRef<HTMLDivElement>(null));

    jest
      .spyOn(document.documentElement, 'clientHeight', 'get')
      .mockImplementation(() => 1000);

    renderHook(() => useIntersection(result.current, mockCallback));

    fireEvent.scroll(window);

    expect(mockCallback).toHaveBeenCalledTimes(0);
  });

  it('should not handle callback after unmount ref node', () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() => useRef<HTMLDivElement>(null));

    jest
      .spyOn(document.documentElement, 'clientHeight', 'get')
      .mockImplementation(() => 1000);

    const { unmount } = render(<div ref={result.current} />);

    renderHook(() => useIntersection(result.current, mockCallback));

    unmount();

    fireEvent.scroll(window);

    expect(mockCallback).toHaveBeenCalledTimes(0);
  });
});
