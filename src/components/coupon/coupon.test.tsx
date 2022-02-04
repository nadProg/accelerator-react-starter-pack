import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Coupon from './coupon';

const mockHistory = createMemoryHistory();

describe('Component: Coupon', () => {
  it('should render correctly', () => {
    render(
      <Router history={mockHistory}>
        <Coupon />
      </Router>);

    expect(screen.getByTestId(/coupon/i)).toBeInTheDocument();
  });
});
