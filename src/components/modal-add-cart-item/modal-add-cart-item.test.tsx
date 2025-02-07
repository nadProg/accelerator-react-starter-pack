import { configureMockStore } from '@jedmao/redux-mock-store';
import {render} from '@testing-library/react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMockGuitarWithReviews } from '../../mock/guitar';
import { createMockState } from '../../mock/state';
import { addItemToCart, increaseItemInCart } from '../../store/cart/cart-actions';
import { State } from '../../types/store';
import ModalAddCartItem from './modal-add-cart-item';

const mockState = createMockState();
let mockStore = configureMockStore<State>()(mockState);

const mockOnClose = jest.fn();

const mockGuitar = createMockGuitarWithReviews();

const mockHistory = createMemoryHistory();

describe('Component: ModalAddCartItem', () => {
  beforeEach(() => {
    mockStore = configureMockStore<State>()(mockState);
    mockStore.dispatch = jest.fn();
  });

  it('should render without errors', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <ModalAddCartItem product={mockGuitar} isActive onClose={mockOnClose} />
        </Provider>
      </Router>,
    );

    expect(screen.getByTestId('modal-add-cart-item')).toBeInTheDocument();
    expect(screen.getByTestId('modal-add-cart-item-submit')).toBeInTheDocument();
    expect(screen.getByTestId('modal-add-cart-item-success')).toBeInTheDocument();

    expect(screen.getByTestId('modal-add-cart-item')).toHaveClass('is-active');
    expect(screen.getByTestId('modal-add-cart-item-success')).not.toHaveClass('is-active');
  });

  it('should handle success modal after item is added to the cart', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <ModalAddCartItem product={mockGuitar} isActive onClose={mockOnClose} />
        </Provider>
      </Router>,
    );

    expect(screen.getByTestId('modal-add-cart-item')).toBeInTheDocument();
    expect(screen.getByTestId('modal-add-cart-item-success')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('modal-add-cart-item-submit'));

    expect(screen.getByTestId('modal-add-cart-item')).not.toHaveClass('is-active');
    expect(screen.getByTestId('modal-add-cart-item-success')).toHaveClass('is-active');

    userEvent.click(screen.getByTestId('modal-add-cart-item-success-submit'));

    expect(screen.getByTestId('modal-add-cart-item')).toHaveClass('is-active');
    expect(screen.getByTestId('modal-add-cart-item-success')).not.toHaveClass('is-active');

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should not show success modal if an error has occurred', () => {
    mockStore.dispatch = () =>{
      throw new Error();
    };

    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <ModalAddCartItem product={mockGuitar} isActive onClose={mockOnClose} />
        </Provider>
      </Router>,
    );

    expect(screen.getByTestId('modal-add-cart-item')).toBeInTheDocument();
    expect(screen.getByTestId('modal-add-cart-item-success')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('modal-add-cart-item-submit'));

    expect(screen.getByTestId('modal-add-cart-item')).toHaveClass('is-active');
    expect(screen.getByTestId('modal-add-cart-item-success')).not.toHaveClass('is-active');
    expect(mockOnClose).toHaveBeenCalledTimes(0);
  });

  it('all modals should be hidden in inactive mode', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <ModalAddCartItem product={mockGuitar} isActive={false} onClose={mockOnClose} />
        </Provider>
      </Router>,
    );

    expect(screen.getByTestId('modal-add-cart-item')).toBeInTheDocument();
    expect(screen.getByTestId('modal-add-cart-item-success')).toBeInTheDocument();

    expect(screen.getByTestId('modal-add-cart-item')).not.toHaveClass('is-active');
    expect(screen.getByTestId('modal-add-cart-item-success')).not.toHaveClass('is-active');
  });

  it('should handle adding new item to the cart', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <ModalAddCartItem product={mockGuitar} isActive onClose={mockOnClose} />
        </Provider>
      </Router>,
    );


    userEvent.click(screen.getByTestId('modal-add-cart-item-submit'));

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith(addItemToCart(mockGuitar));
  });

  it('should increasing item quantity if it is in the cart already', () => {
    mockStore = configureMockStore<State>()({
      ...mockState,
      cart: {
        items: [{
          product: mockGuitar,
          quantity: 1,
        }],
      },
    });

    mockStore.dispatch = jest.fn();

    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <ModalAddCartItem product={mockGuitar} isActive onClose={mockOnClose} />
        </Provider>
      </Router>,
    );

    userEvent.click(screen.getByTestId('modal-add-cart-item-submit'));

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith(increaseItemInCart(mockGuitar.id));
  });
});
