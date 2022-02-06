import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { datatype } from 'faker';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMockGuitar } from '../../mock/guitar';
import { createMockState } from '../../mock/state';
import { CartItem } from '../../types/cart';
import { State } from '../../types/store';
import CartItemCard from './cart-item-card';

const mockOnDelete = jest.fn();

const mockState = createMockState();
const mockStore = configureMockStore<State>()(mockState);

mockStore.dispatch = jest.fn();

const mockHistory = createMemoryHistory();

const mockCartItem: CartItem = {
  product: createMockGuitar(),
  quantity: datatype.number(),
};

describe('Component: CartItem', () => {
  it('should render correctly', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <CartItemCard item={mockCartItem} onDelete={mockOnDelete} />
        </Provider>
      </Router>,
    );

    expect(screen.getByTestId('cart-item-card')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-delete-btn')).toBeInTheDocument();
  });

  it('should handle delete button click correctly', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <CartItemCard item={mockCartItem} onDelete={mockOnDelete} />
        </Provider>
      </Router>,
    );

    userEvent.click(screen.getByTestId('cart-item-delete-btn'));

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
