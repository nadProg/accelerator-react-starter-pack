import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { datatype } from 'faker';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createMockGuitar } from '../../mock/guitar';
import { CartItem } from '../../types/cart';
import CartItemCard from './cart-item-card';

const mockOnDelete = jest.fn();

const mockHistory = createMemoryHistory();

const mockCartItem: CartItem = {
  product: createMockGuitar(),
  quantity: datatype.number(),
};

describe('Component: CartItem', () => {
  it('should render correctly', () => {
    render(
      <Router history={mockHistory}>
        <CartItemCard item={mockCartItem} onDelete={mockOnDelete} />
      </Router>);

    expect(screen.getByTestId('cart-item-card')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-delete-btn')).toBeInTheDocument();
  });

  it('should handle delete button click correctly', () => {
    render(
      <Router history={mockHistory}>
        <CartItemCard item={mockCartItem} onDelete={mockOnDelete} />
      </Router>);

    userEvent.click(screen.getByTestId('cart-item-delete-btn'));

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
