import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import CartTotalInfo from './cart-total-info';

const mockHistory = createMemoryHistory();

describe('Component: Coupon', () => {
  it('should render correctly', () => {
    render(
      <Router history={mockHistory}>
        <CartTotalInfo />
      </Router>);

    expect(screen.getByTestId(/coupon/i)).toBeInTheDocument();
  });
});
