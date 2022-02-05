import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMockState } from '../../mock/state';
import { State } from '../../types/store';
import CartScreen from './cart-screen';

const mockState = createMockState();
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
});
