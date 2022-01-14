import { renderHook } from '@testing-library/react-hooks';
import { useScrollBlock } from './use-scroll-block';

describe('Hook: useScrollBlock', () => {
  it('should return correct result', () => {
    const { result } = renderHook(() => useScrollBlock());
    expect(result.current).not.toBeDefined();
  });

  it('should block scroll', () => {
    const { body } = document;

    expect(body.style).not.toHaveProperty('overflow', 'hidden');

    renderHook(() => useScrollBlock());

    expect(body.style).toHaveProperty('overflow', 'hidden');
  });
});
