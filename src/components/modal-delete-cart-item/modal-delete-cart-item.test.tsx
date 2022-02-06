import { configureMockStore } from '@jedmao/redux-mock-store';
import {render} from '@testing-library/react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMockGuitar } from '../../mock/guitar';
import { createMockState } from '../../mock/state';
import { deleteItemFromCart } from '../../store/cart/cart-actions';
import { State } from '../../types/store';
import ModalDeleteCartItem from './modal-delete-cart-item';

const mockState = createMockState();
const mockStore = configureMockStore<State>()(mockState);

const mockOnClose = jest.fn();

const mockGuitar = createMockGuitar();

const mockHistory = createMemoryHistory();

describe('Component: ModalDeleteCartItem', () => {
  beforeEach(() => {
    mockStore.dispatch = jest.fn();
  });

  it('should render without errors', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <ModalDeleteCartItem product={mockGuitar} isActive onClose={mockOnClose} />
        </Provider>
      </Router>,
    );

    expect(screen.getByTestId('modal-delete-cart-item')).toBeInTheDocument();
    expect(screen.getByTestId('modal-delete-cart-item-submit')).toBeInTheDocument();
    expect(screen.getByTestId('modal-delete-cart-item-cancel')).toBeInTheDocument();
  });

  it('should render without errors when no product', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <ModalDeleteCartItem product={null} isActive onClose={mockOnClose} />
        </Provider>
      </Router>,
    );

    expect(screen.getByTestId('modal-delete-cart-item')).toBeInTheDocument();
    expect(screen.queryByTestId('modal-delete-cart-item-submit')).not.toBeInTheDocument();
    expect(screen.queryByTestId('modal-delete-cart-item-cancel')).not.toBeInTheDocument();
  });

  it('should handle delete cancel', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <ModalDeleteCartItem product={mockGuitar} isActive onClose={mockOnClose} />
        </Provider>
      </Router>,
    );

    userEvent.click(screen.getByTestId('modal-delete-cart-item-cancel'));

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(deleteItemFromCart(mockGuitar.id));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should handle delete submit', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <ModalDeleteCartItem product={mockGuitar} isActive onClose={mockOnClose} />
        </Provider>
      </Router>,
    );

    userEvent.click(screen.getByTestId('modal-delete-cart-item-submit'));

    expect(mockStore.dispatch).toHaveBeenCalledWith(deleteItemFromCart(mockGuitar.id));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
