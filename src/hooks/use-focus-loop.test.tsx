import { useRef } from 'react';
import { useFocusLoop } from './use-focus-loop';
import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';

describe('Hook: useFocus', () => {
  it('should return correct result', () => {
    const {
      result: { current: ref },
    } = renderHook(() => useRef<HTMLDivElement>(null));

    render(
      <div ref={ref}>
        <input />
        <button />
      </div>,
    );

    const { result } = renderHook(() => useFocusLoop(true, ref));

    expect(result.current).not.toBeDefined();
  });

  it('should return correct result when no active elements', () => {
    const {
      result: { current: ref },
    } = renderHook(() => useRef<HTMLDivElement>(null));

    render(<div ref={ref} />);

    const { result } = renderHook(() => useFocusLoop(true, ref));

    expect(result.current).not.toBeDefined();
  });
});
