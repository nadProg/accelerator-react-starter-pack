import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMockState } from '../../mock/state';
import { State } from '../../types/store';
import Coupon from './coupon';

const mockState = createMockState();
const mockStore = configureMockStore<State>()(mockState);

const mockHistory = createMemoryHistory();

describe('Component: Coupon', () => {
  it('should render correctly', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <Coupon />
        </Provider>
      </Router>);

    expect(screen.getByTestId('coupon')).toBeInTheDocument();
  });
});
