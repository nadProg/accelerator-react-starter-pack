import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import CartScreen from './cart-screen';

const mockHistory = createMemoryHistory();

describe('Component: CartScreen', () => {
  it('should render correctly', () => {
    render(
      <Router history={mockHistory}>
        <CartScreen />
      </Router>);

    expect(screen.getByTestId(/cart-screen/i)).toBeInTheDocument();
  });
});
