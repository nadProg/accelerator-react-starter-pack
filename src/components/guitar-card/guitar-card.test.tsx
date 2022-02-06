import {render, within} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Router } from 'react-router-dom';
import { createMockGuitarWithReviews } from '../../mock/guitar';
import GuitarCard from './guitar-card';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockState } from '../../mock/state';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/store';
import { Provider } from 'react-redux';
import { AppRoute } from '../../constants/endpoints';

const mockState = createMockState();
let mockStore = configureMockStore<State>()(mockState);

const mockProduct = createMockGuitarWithReviews();

const mockHistory = createMemoryHistory();

describe('Component: ProductCard', () => {
  beforeEach(() => {
    mockStore = configureMockStore<State>()(mockState);
  });

  it('should render without errors', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <GuitarCard guitar={mockProduct} />
        </Provider>
      </Router>,
    );
  });

  it('should handle open/close add-to-card modal when product is not in the cart', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <Route path={AppRoute.Cart()} exact>
            <div data-testid="cart-screen" />
          </Route>
          <Route>
            <GuitarCard guitar={mockProduct} />
          </Route>
        </Provider>
      </Router>,
    );

    const modal = screen.getByTestId('modal-add-cart-item');

    expect(modal).not.toHaveClass('is-active');

    expect(screen.getByTestId('button-add-to-cart')).toHaveTextContent(/Купить/i);
    expect(screen.getByTestId('button-add-to-cart')).not.toHaveTextContent(/В корзине/i);

    userEvent.click(screen.getByTestId('button-add-to-cart'));
    expect(modal).toHaveClass('is-active');

    userEvent.click(within(modal).getByTestId('modal-overlay'));
    expect(modal).not.toHaveClass('is-active');

    expect(screen.queryByTestId('cart-screen')).not.toBeInTheDocument();
  });

  it('should handle redirect to cart screen when product is in the cart already', () => {
    mockStore = configureMockStore<State>()({
      ...mockState,
      cart: {
        items: [{
          product: mockProduct,
          quantity: 1,
        }],
      },
    });

    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <Route path={AppRoute.Cart()} exact>
            <div data-testid="cart-screen" />
          </Route>
          <Route>
            <GuitarCard guitar={mockProduct} />
          </Route>
        </Provider>
      </Router>,
    );

    expect(screen.getByTestId('modal-add-cart-item')).not.toHaveClass('is-active');

    expect(screen.getByTestId('button-add-to-cart')).not.toHaveTextContent(/Купить/i);
    expect(screen.getByTestId('button-add-to-cart')).toHaveTextContent(/В корзине/i);

    expect(screen.queryByTestId('cart-screen')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('button-add-to-cart'));

    expect(screen.getByTestId('cart-screen')).toBeInTheDocument();
  });
});
