import { act, renderHook } from '@testing-library/react-hooks';
import { DEBOUNCE_TIME } from '../constants/common';
import { asyncDelay } from '../utils/common';
import { useDebounce } from './use-debounce';


describe('Hook: useDebounce', () => {

  it('should return correct result', () => {
    const mockFunction = jest.fn();
    const { result } = renderHook(() => useDebounce(mockFunction, DEBOUNCE_TIME));
    const { current: debouncedFunction } = result;

    expect(debouncedFunction).not.toEqual(mockFunction);
  });

  it('should return correct debounced function', async () => {
    const mockFunction = jest.fn();
    const { result } = renderHook(() => useDebounce(mockFunction, DEBOUNCE_TIME));
    const { current: debouncedFunction } = result;

    debouncedFunction();

    expect(mockFunction).not.toHaveBeenCalled();

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });

    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});
