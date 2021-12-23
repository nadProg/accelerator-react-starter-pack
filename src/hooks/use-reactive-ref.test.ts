import { renderHook } from '@testing-library/react-hooks';
import { datatype } from 'faker';
import { useReactiveRef } from './use-reactive-ref';


describe('Hook: useReactiveRef', () => {

  it('should return correct result', () => {
    const mockState = datatype.number();
    const { result } = renderHook(() => useReactiveRef(mockState));
    const { current } = result.current;

    expect(current).toBe(mockState);
  });
});
