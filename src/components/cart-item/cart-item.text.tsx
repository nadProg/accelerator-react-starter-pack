import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import CartItem from './cart-item';

const mockHistory = createMemoryHistory();

describe('Component: CartItem', () => {
  it('should render correctly', () => {
    render(
      <Router history={mockHistory}>
        <CartItem />
      </Router>);

    expect(screen.getByTestId(/cart-item/i)).toBeInTheDocument();
  });
});
