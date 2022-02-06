import { UNKNOWN_ACTION } from '../../constants/action';
import { createMockGuitar } from '../../mock/guitar';
import { addItemToCart } from './cart-actions';
import { cartInitialState } from './cart-initial-state';
import { cartReducer } from './cart-reducer';

describe('Reducer: Cart', () => {
  it('without additional parameters should return initial state', () => {
    expect(cartReducer(void 0 , UNKNOWN_ACTION))
      .toEqual(cartInitialState);
  });

  it('should add new item to the cart', () => {
    const mockProduct = createMockGuitar();

    expect(cartReducer(cartInitialState, addItemToCart(mockProduct)))
      .toEqual({
        ...cartInitialState,
        items: [{
          product: mockProduct,
          quantity: 1,
        }],
      });
  });
});
