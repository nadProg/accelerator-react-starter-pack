import { renderHook } from '@testing-library/react-hooks';
import { useScrollBlock } from './use-scroll-block';

describe('Hook: useScrollBlock', () => {
  it('should have no return and block scroll', () => {
    const { body } = document;

    expect(body.style).not.toHaveProperty('overflow', 'hidden');

    const { result } = renderHook(() => useScrollBlock(true));
    expect(result.current).not.toBeDefined();

    expect(body.style).toHaveProperty('overflow', 'hidden');
  });
});
