import { datatype } from 'faker';
import { UNKNOWN_ACTION } from '../../constants/action';
import { createMockCart } from '../../mock/cart';
import { createMockGuitar } from '../../mock/guitar';
import { addItemToCart, decreaseItemInCart, deleteItemFromCart, increaseItemInCart, setCartItemQuantity } from './cart-actions';
import { cartInitialState } from './cart-initial-state';
import { cartReducer } from './cart-reducer';

describe('Reducer: Cart', () => {
  it('without additional parameters should return initial state', () => {
    expect(cartReducer(void 0, UNKNOWN_ACTION)).toEqual(cartInitialState);
  });

  it('should add new item to the cart', () => {
    const mockProduct = createMockGuitar();

    expect(cartReducer(cartInitialState, addItemToCart(mockProduct))).toEqual({
      ...cartInitialState,
      items: [
        {
          product: mockProduct,
          quantity: 1,
        },
      ],
    });
  });

  it('should throw error when adding an item that is already in the cart', () => {
    const mockProduct = createMockGuitar();

    const state = cartReducer(cartInitialState, addItemToCart(mockProduct));

    expect(() => cartReducer(state, addItemToCart(mockProduct))).toThrowError();
  });

  it('should delete item from the cart', () => {
    const mockCart = createMockCart(10);
    const mockIndex = 5;
    const mockCartItem = mockCart.items[mockIndex];

    const state = cartReducer({
      ...cartInitialState,
      ...mockCart,
    }, deleteItemFromCart(mockCartItem.product.id));

    mockCart.items.splice(mockIndex, 1);

    expect(state).toEqual({
      ...cartInitialState,
      ...mockCart,
    });
  });

  it('should throw error when deleting an item that is absent in the cart', () => {
    const mockCart = createMockCart(10);
    const mockId = datatype.number();
    mockCart.items = mockCart.items.filter(({product}) => product.id !== mockId);

    expect(() => cartReducer({
      ...cartInitialState,
      ...mockCart,
    }, deleteItemFromCart(mockId))).toThrowError();
  });

  it('should increase item quantity', () => {
    const mockCart = createMockCart(10);
    const mockIndex = 5;
    const mockCartItem = mockCart.items[mockIndex];

    const state = cartReducer(
      {
        ...cartInitialState,
        ...mockCart,
      },
      increaseItemInCart(mockCartItem.product.id),
    );

    mockCart.items[mockIndex].quantity += 1;

    expect(state).toEqual({
      ...cartInitialState,
      ...mockCart,
    });
  });

  it('should throw error when increasing item that is absent in the cart', () => {
    const mockCart = createMockCart(10);
    const mockId = datatype.number();
    mockCart.items = mockCart.items.filter(({product}) => product.id !== mockId);

    expect(() => cartReducer(
      {
        ...cartInitialState,
        ...mockCart,
      },
      increaseItemInCart(mockId),
    )).toThrowError();
  });

  it('should decrease item quantity', () => {
    const mockCart = createMockCart(10);
    const mockIndex = 5;
    const mockCartItem = mockCart.items[mockIndex];

    const state = cartReducer(
      {
        ...cartInitialState,
        ...mockCart,
      },
      decreaseItemInCart(mockCartItem.product.id),
    );

    mockCart.items[mockIndex].quantity -= 1;

    expect(state).toEqual({
      ...cartInitialState,
      ...mockCart,
    });
  });

  it('should throw error when decreasing item that is absent in the cart', () => {
    const mockCart = createMockCart(10);
    const mockId = datatype.number();
    mockCart.items = mockCart.items.filter(({product}) => product.id !== mockId);

    expect(() => cartReducer(
      {
        ...cartInitialState,
        ...mockCart,
      },
      decreaseItemInCart(mockId),
    )).toThrowError();
  });

  it('should set item quantity', () => {
    const mockCart = createMockCart(10);
    const mockIndex = 5;
    const mockCartItem = mockCart.items[mockIndex];

    const mockQuantity = datatype.number();

    const state = cartReducer(
      {
        ...cartInitialState,
        ...mockCart,
      },
      setCartItemQuantity(mockCartItem.product.id, mockQuantity),
    );

    mockCart.items[mockIndex].quantity = mockQuantity;

    expect(state).toEqual({
      ...cartInitialState,
      ...mockCart,
    });
  });

  it('should throw error when setting quantity of item that is absent in the cart', () => {
    const mockCart = createMockCart(10);
    const mockId = datatype.number();
    mockCart.items = mockCart.items.filter(({product}) => product.id !== mockId);

    expect(() => cartReducer(
      {
        ...cartInitialState,
        ...mockCart,
      },
      setCartItemQuantity(mockId, datatype.number()),
    )).toThrowError();
  });
});
