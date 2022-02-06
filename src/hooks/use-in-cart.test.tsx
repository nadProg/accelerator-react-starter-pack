import { ProviderProps } from 'react';
import { renderHook, RenderHookOptions } from '@testing-library/react-hooks';
import { useInCart } from './use-in-cart';
import { Provider } from 'react-redux';
import { createMockState } from '../mock/state';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/store';
import { createMockCart, createMockCartItem } from '../mock/cart';
import { datatype } from 'faker';

describe('Hook: useInCart', () => {
  it('should return false if a product is not in the cart', () => {
    const mockId = datatype.number();
    const mockCart = createMockCart(100);

    const mockState = createMockState();
    const mockStore = configureMockStore<State>()({
      ...mockState,
      cart: {
        items: mockCart.items.filter(({ product }) => product.id !== mockId),
      },
    });

    const wrapper: RenderHookOptions<
      ProviderProps<typeof mockStore>
    >['wrapper'] = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );

    const { result } = renderHook(() => useInCart(mockId), { wrapper });

    expect(result.current).toBe(false);
  });

  it('should return true if a product is in the cart', () => {
    const mockCart = createMockCart(100);
    const mockCartItem = createMockCartItem();

    mockCart.items.push(mockCartItem);

    const mockState = createMockState();
    const mockStore = configureMockStore<State>()({
      ...mockState,
      cart: {
        ...mockCart,
      },
    });

    const wrapper: RenderHookOptions<
      ProviderProps<typeof mockStore>
    >['wrapper'] = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );

    const { result } = renderHook(() => useInCart(mockCartItem.product.id), {
      wrapper,
    });

    expect(result.current).toBe(true);
  });
});
