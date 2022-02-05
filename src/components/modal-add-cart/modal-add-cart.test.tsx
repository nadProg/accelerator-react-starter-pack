import { configureMockStore } from '@jedmao/redux-mock-store';
import {render} from '@testing-library/react';
import { screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockGuitarWithReviews } from '../../mock/guitar';
import { createMockState } from '../../mock/state';
import { State } from '../../types/store';
import ModalAddCart from './modal-add-cart';

const mockState = createMockState();
const mockStore = configureMockStore<State>()(mockState);

mockStore.dispatch = jest.fn();

const mockOnClose = jest.fn();

const mockGuitar = createMockGuitarWithReviews();

describe('Component: ModalAddCart', () => {
  it('should render without errors', () => {
    render(
      <Provider store={mockStore}>
        <ModalAddCart guitar={mockGuitar} isActive onClose={mockOnClose} />
      </Provider>,
    );

    expect(screen.getByTestId('modal-add-cart')).toBeInTheDocument();
    expect(screen.getByTestId('modal-add-cart-success')).toBeInTheDocument();
  });
});
