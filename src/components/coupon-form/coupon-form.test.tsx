import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { datatype } from 'faker/locale/zh_TW';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { FetchStatus } from '../../constants/common';
import { createMockState } from '../../mock/state';
import { setCoupon } from '../../store/coupon/coupon-actions';
import { State } from '../../types/store';
import CouponForm from './coupon-form';

const mockState = createMockState();
let mockStore = configureMockStore<State>()(mockState);

const mockHistory = createMemoryHistory();

describe('Component: CouponForm', () => {
  beforeEach(() => {
    mockStore = configureMockStore<State>()(mockState);
  });
  it('should render correctly', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <CouponForm />
        </Provider>
      </Router>);

    expect(screen.getByTestId('coupon')).toBeInTheDocument();
    expect(screen.getByTestId('coupon-input')).toBeInTheDocument();
  });

  it('should handle coupon form submit correctly', () => {
    mockStore.dispatch = jest.fn();

    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <CouponForm />
        </Provider>
      </Router>);

    userEvent.type(screen.getByTestId('coupon-input'), 'abc 123 cdf - 456');

    expect(mockStore.dispatch).not.toHaveBeenCalled();

    userEvent.click(screen.getByTestId('coupon-submit'));

    expect(mockStore.dispatch).toBeCalledWith(setCoupon('abc123cdf-456'));
    expect(mockStore.dispatch).toHaveBeenCalledTimes(2);
  });

  it('should render succeed state correctly', () => {
    mockStore = configureMockStore<State>()({
      ...mockState,
      coupon: {
        ...mockState.coupon,
        discount: {
          data: datatype.number(),
          status: FetchStatus.Succeeded,
        },
      },
    });

    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <CouponForm />
        </Provider>
      </Router>);

    expect(screen.getByText(/Промокод принят/i)).toBeInTheDocument();
  });

  it('should render failed state correctly', () => {
    mockStore = configureMockStore<State>()({
      ...mockState,
      coupon: {
        ...mockState.coupon,
        discount: {
          data: null,
          status: FetchStatus.Failed,
        },
      },
    });

    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <CouponForm />
        </Provider>
      </Router>);

    expect(screen.getByText(/Неверный промокод/i)).toBeInTheDocument();
  });
});
