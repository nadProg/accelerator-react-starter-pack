import { configureMockStore } from '@jedmao/redux-mock-store';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { asyncDelay, DEBOUNCE_TIME, FetchStatus } from '../../constants/common';
import { SortOrder, SortTypeValue } from '../../constants/sort';
import { createMockState } from '../../mock/state';
import { setCatalogGuitarsStatus } from '../../store/guitars/guitars-actions';
import { setSortOrder, SetSortType } from '../../store/sort/sort-actions';
import { State } from '../../types/store';
import CatalogSort from './catalog-sort';

const mockState = createMockState();

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    const mockStore = configureMockStore<State>()(mockState);

    render(
      <Provider store={mockStore}>
        <CatalogSort />
      </Provider>,
    );

    expect(screen.getByTestId('price-sort-button')).toBeInTheDocument();
    expect(screen.getByTestId('rating-sort-button')).toBeInTheDocument();
    expect(screen.getByTestId('ascending-order-button')).toBeInTheDocument();
    expect(screen.getByTestId('descending-order-button')).toBeInTheDocument();
  });

  it('should set ascending order if order is undefined when click on price type', () => {
    const mockStore = configureMockStore<State>()(mockState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <CatalogSort />
      </Provider>,
    );

    userEvent.click(screen.getByTestId('price-sort-button'));

    expect(mockStore.dispatch).toHaveBeenCalledWith(SetSortType(SortTypeValue.Price));
    expect(mockStore.dispatch).toHaveBeenCalledWith(setSortOrder(SortOrder.Ascending));
  });

  it('should set ascending order if order is undefined when click on rating type', () => {
    const mockStore = configureMockStore<State>()(mockState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <CatalogSort />
      </Provider>,
    );

    userEvent.click(screen.getByTestId('rating-sort-button'));

    expect(mockStore.dispatch).toHaveBeenCalledWith(SetSortType(SortTypeValue.Rating));
    expect(mockStore.dispatch).toHaveBeenCalledWith(setSortOrder(SortOrder.Ascending));
  });

  it('should set price type if type is undefined when click on ascending order', () => {
    const mockStore = configureMockStore<State>()(mockState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <CatalogSort />
      </Provider>,
    );

    userEvent.click(screen.getByTestId('ascending-order-button'));

    expect(mockStore.dispatch).toHaveBeenCalledWith(setSortOrder(SortOrder.Ascending));
    expect(mockStore.dispatch).toHaveBeenCalledWith(SetSortType(SortTypeValue.Price));
  });

  it('should set price type if type is undefined when click on descending order', () => {
    const mockStore = configureMockStore<State>()(mockState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <CatalogSort />
      </Provider>,
    );

    userEvent.click(screen.getByTestId('descending-order-button'));

    expect(mockStore.dispatch).toHaveBeenCalledWith(setSortOrder(SortOrder.Descending));
    expect(mockStore.dispatch).toHaveBeenCalledWith(SetSortType(SortTypeValue.Price));
  });

  it('should handle click correctly when price selected ascending', async () => {
    const mockStore = configureMockStore<State>()({
      ...mockState,
      sort: {
        type: SortTypeValue.Price,
        order: SortOrder.Ascending,
      },
    });

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <CatalogSort />
      </Provider>,
    );

    userEvent.click(screen.getByTestId('price-sort-button'));
    userEvent.click(screen.getByTestId('price-sort-button'));
    userEvent.click(screen.getByTestId('price-sort-button'));

    userEvent.click(screen.getByTestId('ascending-order-button'));
    userEvent.click(screen.getByTestId('ascending-order-button'));
    userEvent.click(screen.getByTestId('ascending-order-button'));

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith(setCatalogGuitarsStatus(FetchStatus.Idle));
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByTestId('rating-sort-button'));
    userEvent.click(screen.getByTestId('descending-order-button'));

    expect(mockStore.dispatch).toHaveBeenCalledWith(SetSortType(SortTypeValue.Rating));
    expect(mockStore.dispatch).toHaveBeenCalledWith(setSortOrder(SortOrder.Descending));
    expect(mockStore.dispatch).toHaveBeenCalledTimes(3);
  });

  it('should handle click correctly when rating selected descending', async () => {
    const mockStore = configureMockStore<State>()({
      ...mockState,
      sort: {
        type: SortTypeValue.Rating,
        order: SortOrder.Descending,
      },
    });

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <CatalogSort />
      </Provider>,
    );

    userEvent.click(screen.getByTestId('rating-sort-button'));
    userEvent.click(screen.getByTestId('rating-sort-button'));
    userEvent.click(screen.getByTestId('rating-sort-button'));

    userEvent.click(screen.getByTestId('descending-order-button'));
    userEvent.click(screen.getByTestId('descending-order-button'));
    userEvent.click(screen.getByTestId('descending-order-button'));

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith(setCatalogGuitarsStatus(FetchStatus.Idle));
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByTestId('price-sort-button'));
    userEvent.click(screen.getByTestId('ascending-order-button'));

    expect(mockStore.dispatch).toHaveBeenCalledWith(SetSortType(SortTypeValue.Price));
    expect(mockStore.dispatch).toHaveBeenCalledWith(setSortOrder(SortOrder.Ascending));
    expect(mockStore.dispatch).toHaveBeenCalledTimes(3);
  });
});
