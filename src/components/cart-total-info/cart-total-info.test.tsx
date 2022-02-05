import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMockState } from '../../mock/state';
import { State } from '../../types/store';
import CartTotalInfo from './cart-total-info';

const mockState = createMockState();
const mockStore = configureMockStore<State>()(mockState);

const mockHistory = createMemoryHistory();

describe('Component: Coupon', () => {
  it('should render correctly', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <CartTotalInfo />
        </Provider>
      </Router>);

    expect(screen.getByTestId(/coupon/i)).toBeInTheDocument();
  });
});
