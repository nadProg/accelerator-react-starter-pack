import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createMockGuitar } from '../../mock/guitar';
import { CartItem } from '../../types/cart';
import CartItemCard from './cart-item-card';

const mockHistory = createMemoryHistory();

const mockCartItem: CartItem = {
  product: createMockGuitar(),
  quantity: datatype.number(),
};

describe('Component: CartItem', () => {
  it('should render correctly', () => {
    render(
      <Router history={mockHistory}>
        <CartItemCard item={mockCartItem} />
      </Router>);

    expect(screen.getByTestId(/cart-item/i)).toBeInTheDocument();
  });
});
