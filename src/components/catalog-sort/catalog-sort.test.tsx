import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Order, Type } from '../../constants/sort';
import { createMockState } from '../../mock/state';
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

  it('should handle click correctly when price selected ascending', () => {
    const mockStore = configureMockStore<State>()({
      ...mockState,
      sort: {
        type: Type.Price,
        order: Order.Ascending,
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

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByTestId('rating-sort-button'));
    userEvent.click(screen.getByTestId('descending-order-button'));

    expect(mockStore.dispatch).toHaveBeenCalledTimes(3);
  });

  it('should handle click correctly when rating selected descending', () => {
    const mockStore = configureMockStore<State>()({
      ...mockState,
      sort: {
        type: Type.Rating,
        order: Order.Descending,
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

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByTestId('price-sort-button'));
    userEvent.click(screen.getByTestId('ascending-order-button'));

    expect(mockStore.dispatch).toHaveBeenCalledTimes(3);
  });
});
