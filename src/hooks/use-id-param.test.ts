import ReactRouter from 'react-router';
import { renderHook } from '@testing-library/react-hooks';
import { useIdParam } from './use-id-param';

const mockId = '12';
const mockInvalidId = 'a12';

describe('Hook: useIdParam', () => {

  it('should return id', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: mockId});

    const { result } = renderHook(() => useIdParam());
    const { id, error } = result.current;

    expect(id).toBe(Number(mockId));
    expect(error).toBeUndefined();
  });

  it('should throw error when id is invalid', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: mockInvalidId});

    const { result } = renderHook(() => useIdParam());
    const { id, error } = result.current;

    expect(id).toBeUndefined();
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe('Id is not valid');
  });

  it('should throw error when no id in the path', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({});

    const { result } = renderHook(() => useIdParam());
    const { id, error } = result.current;

    expect(id).toBeUndefined();
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe('Id param does not exist');
  });
});
