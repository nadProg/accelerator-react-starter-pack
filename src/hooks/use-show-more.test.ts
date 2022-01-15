import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { createMockGuitar } from '../mock/guitar';
import { createArrayOfObjects } from '../utils/common';
import { useShowMore } from './use-show-more';

describe('Hook: useShowMore', () => {
  it('should return correct result', () => {
    const mockGuitars = createArrayOfObjects(createMockGuitar, 1);

    const { result } = renderHook(() => useShowMore({
      items: mockGuitars,
      size: 1,
      start: 1,
    }));

    expect(result.current.shownItems).toEqual(mockGuitars);
    expect(result.current.isMore).toEqual(false);
  });

  it('should implement show more behavior', () => {
    const mockGuitars = createArrayOfObjects(createMockGuitar, 3);

    const { result } = renderHook(() => useShowMore({
      items: mockGuitars,
      size: 1,
      start: 1,
    }));

    expect(result.current.shownItems).toEqual([mockGuitars[0]]);
    expect(result.current.isMore).toEqual(true);

    act(() => result.current.showMore());

    expect(result.current.shownItems).toEqual([mockGuitars[0], mockGuitars[1]]);
    expect(result.current.isMore).toEqual(true);

    act(() => result.current.showMore());

    expect(result.current.shownItems).toEqual(mockGuitars);
    expect(result.current.isMore).toEqual(false);
  });
});
