import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { asyncDelay } from '../utils/common';
import { useScrollBlock } from './use-scroll-block';

describe('Hook: useScrollBlock', () => {
  it('should have no return', () => {
    const { result } = renderHook(() => useScrollBlock(false));
    expect(result.current).not.toBeDefined();
  });

  it('should not block scroll', async () => {
    const { body } = document;

    expect(body.style).not.toHaveProperty('overflow', 'hidden');

    renderHook(() => useScrollBlock(false));
    await act(async () => await asyncDelay(600));

    expect(body.style).not.toHaveProperty('overflow', 'hidden');
  });

  it('should block scroll', () => {
    const { body } = document;

    expect(body.style).not.toHaveProperty('overflow', 'hidden');

    renderHook(() => useScrollBlock(true));

    expect(body.style).toHaveProperty('overflow', 'hidden');

  });
});
