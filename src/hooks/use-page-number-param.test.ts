import ReactRouter from 'react-router';
import { renderHook } from '@testing-library/react-hooks';
import { usePageNumberParam } from './use-page-number-param';
import { getPageParam, parsePageNumber } from '../utils/pagination';
import { datatype, lorem } from 'faker';
import { PAGE_TEMPLATE } from '../constants/pagination';


describe('Hook: usePageNumberParam', () => {

  it('should return pageNumber', () => {
    const mockPage = getPageParam(datatype.number());
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ page: mockPage});

    const { result } = renderHook(() => usePageNumberParam());
    const { pageNumber, error } = result.current;

    expect(pageNumber).toBe(parsePageNumber(mockPage));
    expect(error).toBeUndefined();
  });

  it('should throw error when pageNumber is invalid', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ page: `${PAGE_TEMPLATE}${lorem.word()}`});

    const { result } = renderHook(() => usePageNumberParam());
    const { pageNumber, error } = result.current;

    expect(pageNumber).toBeUndefined();
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe('Page is not valid');
  });

  it('should throw error when no pageNumber in the path', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({
      page: PAGE_TEMPLATE,
    });

    const { result } = renderHook(() => usePageNumberParam());
    const { pageNumber, error } = result.current;

    expect(pageNumber).toBeUndefined();
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe('Page is not valid');
  });

  it('should throw error when no page template in the path', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({
      page: lorem.word(),
    });

    const { result } = renderHook(() => usePageNumberParam());
    const { pageNumber, error } = result.current;

    expect(pageNumber).toBeUndefined();
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe('Page is not valid');
  });

  it('should throw error when no page in the path', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({});

    const { result } = renderHook(() => usePageNumberParam());
    const { pageNumber, error } = result.current;

    expect(pageNumber).toBeUndefined();
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe('Page param does not exist');
  });
});
