import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { datatype } from 'faker';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { QuantityRestriction } from '../../constants/cart';
import { KeyCode } from '../../constants/common';
import { createMockGuitar } from '../../mock/guitar';
import { createMockState } from '../../mock/state';
import {
  decreaseItemInCart,
  increaseItemInCart,
  setCartItemQuantity
} from '../../store/cart/cart-actions';
import { CartItem } from '../../types/cart';
import { State } from '../../types/store';
import CartItemCard from './cart-item-card';

const mockHistory = createMemoryHistory();

const mockProduct = createMockGuitar();
const mockQuantity = 50;

const mockCartItem: CartItem = {
  product: mockProduct,
  quantity: mockQuantity,
};

const mockState = createMockState();
const mockStore = configureMockStore<State>()({
  ...mockState,
  cart: {
    items: [mockCartItem],
  },
});

mockStore.dispatch = jest.fn();

const mockOnDeleteCartItem = jest.fn();

describe('Component: CartItemCard', () => {
  it('should render correctly', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <CartItemCard item={mockCartItem} onDeleteCartItem={mockOnDeleteCartItem} />
        </Provider>
      </Router>,
    );

    expect(screen.getByTestId('cart-item-card')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-delete-btn')).toBeInTheDocument();
  });

  it('should handle delete button click correctly', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <CartItemCard item={mockCartItem} onDeleteCartItem={mockOnDeleteCartItem} />
        </Provider>
      </Router>,
    );

    userEvent.click(screen.getByTestId('cart-item-delete-btn'));

    expect(mockOnDeleteCartItem).toHaveBeenCalledTimes(1);
  });

  it('should handle increasing quantity', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <CartItemCard item={mockCartItem} onDeleteCartItem={mockOnDeleteCartItem} />
        </Provider>
      </Router>,
    );

    userEvent.click(screen.getByTestId('cart-item-increase-btn'));

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      increaseItemInCart(mockProduct.id),
    );

    expect(mockOnDeleteCartItem).not.toHaveBeenCalled();
  });

  it('should prevent increasing quantity higher than highest limit', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <CartItemCard
            item={{
              ...mockCartItem,
              quantity: QuantityRestriction.Max,
            }}
            onDeleteCartItem={mockOnDeleteCartItem}
          />
        </Provider>
      </Router>,
    );

    userEvent.click(screen.getByTestId('cart-item-increase-btn'));

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      increaseItemInCart(mockProduct.id),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      setCartItemQuantity(mockProduct.id, QuantityRestriction.Max),
    );

    expect(mockOnDeleteCartItem).not.toHaveBeenCalled();
  });

  it('should handle decreasing quantity', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <CartItemCard item={mockCartItem} onDeleteCartItem={mockOnDeleteCartItem} />
        </Provider>
      </Router>,
    );

    userEvent.click(screen.getByTestId('cart-item-decrease-btn'));

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      decreaseItemInCart(mockProduct.id),
    );

    expect(mockOnDeleteCartItem).not.toHaveBeenCalled();
  });

  it('should prevent decreasing quantity lower than lowest limit', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <CartItemCard
            item={{
              ...mockCartItem,
              quantity: QuantityRestriction.Min,
            }}
            onDeleteCartItem={mockOnDeleteCartItem}
          />
        </Provider>
      </Router>,
    );

    userEvent.click(screen.getByTestId('cart-item-decrease-btn'));

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      decreaseItemInCart(mockProduct.id),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      setCartItemQuantity(mockProduct.id, QuantityRestriction.Min),
    );

    expect(mockOnDeleteCartItem).toHaveBeenCalledTimes(1);
  });

  it('should handle manual quantity changing', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <CartItemCard item={mockCartItem} onDeleteCartItem={mockOnDeleteCartItem} />
        </Provider>
      </Router>,
    );

    const mockInput = 70;

    userEvent.type(
      screen.getByTestId('cart-item-quantity-input'),
      `{Delete} {Delete} ${mockInput}`,
    );

    userEvent.click(screen.getByTestId('cart-item-card'));

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      setCartItemQuantity(mockProduct.id, mockInput),
    );

    userEvent.type(
      screen.getByTestId('cart-item-quantity-input'),
      `{Delete} {Delete} ${mockInput + 1}`,
    );

    fireEvent.keyDown(screen.getByTestId('cart-item-quantity-input'), {
      code: KeyCode.Enter,
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      setCartItemQuantity(mockProduct.id, mockInput + 1),
    );

    userEvent.type(
      screen.getByTestId('cart-item-quantity-input'),
      `{Delete} {Delete} ${mockInput - 1}`,
    );

    fireEvent.keyDown(screen.getByTestId('cart-item-quantity-input'), {
      code: KeyCode.NumpadEnter,
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      setCartItemQuantity(mockProduct.id, mockInput - 1),
    );

    expect(mockOnDeleteCartItem).not.toHaveBeenCalled();
  });

  it('should prevent incorrect manual quantity changing', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <CartItemCard item={mockCartItem} onDeleteCartItem={mockOnDeleteCartItem} />
        </Provider>
      </Router>,
    );

    const incorrectInput = 'incorrect';

    userEvent.type(
      screen.getByTestId('cart-item-quantity-input'),
      `{Delete} {Delete} ${incorrectInput}`,
    );

    userEvent.click(screen.getByTestId('cart-item-card'));

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      setCartItemQuantity(mockProduct.id, Number(incorrectInput)),
    );

    userEvent.type(
      screen.getByTestId('cart-item-quantity-input'),
      `{Delete} {Delete} ${QuantityRestriction.Max + datatype.number()}`,
    );

    fireEvent.keyDown(screen.getByTestId('cart-item-quantity-input'), {
      code: KeyCode.Enter,
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      setCartItemQuantity(mockProduct.id, QuantityRestriction.Max),
    );

    userEvent.type(
      screen.getByTestId('cart-item-quantity-input'),
      `{Delete} {Delete} ${QuantityRestriction.Min - datatype.number()}`,
    );

    fireEvent.keyDown(screen.getByTestId('cart-item-quantity-input'), {
      code: KeyCode.NumpadEnter,
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      setCartItemQuantity(mockProduct.id, QuantityRestriction.Min),
    );

    expect(mockOnDeleteCartItem).toHaveBeenCalled();
  });
});
