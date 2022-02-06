import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMockCart } from '../../mock/cart';
import { createMockState } from '../../mock/state';
import { State } from '../../types/store';
import CartScreen from './cart-screen';

const mockState = {
  ...createMockState(),
  cart: createMockCart(10),
};
const mockStore = configureMockStore<State>()(mockState);

const mockHistory = createMemoryHistory();

describe('Component: CartScreen', () => {
  it('should render correctly', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <CartScreen />
        </Provider>
      </Router>);

    expect(screen.getByTestId('coupon')).toBeInTheDocument();
    expect(screen.getByTestId('cart-total-info')).toBeInTheDocument();
  });

  it('should handle delete item modal', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <CartScreen />
        </Provider>
      </Router>);

    const modal = screen.getByTestId('modal-delete-cart-item');

    expect(modal).toBeInTheDocument();
    expect(modal).not.toHaveClass('is-active');

    const mockCurrentCard = screen.getAllByTestId('cart-item-card')[5];

    userEvent.click(within(mockCurrentCard).getByTestId('cart-item-delete-btn'));

    expect(modal).toHaveClass('is-active');

    userEvent.click(within(modal).getByTestId('modal-overlay'));

    expect(modal).not.toHaveClass('is-active');
  });
});
