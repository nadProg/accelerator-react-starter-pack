import { configureMockStore } from '@jedmao/redux-mock-store';
import {render} from '@testing-library/react';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMockGuitarWithReviews } from '../../mock/guitar';
import { createMockState } from '../../mock/state';
import { State } from '../../types/store';
import ModalAddCart from './modal-add-cart';

const mockState = createMockState();
const mockStore = configureMockStore<State>()(mockState);

mockStore.dispatch = jest.fn();

const mockOnClose = jest.fn();

const mockGuitar = createMockGuitarWithReviews();

const mockHistory = createMemoryHistory();

describe('Component: ModalAddCart', () => {
  it('should render without errors', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <ModalAddCart guitar={mockGuitar} isActive onClose={mockOnClose} />
        </Provider>
      </Router>,
    );

    expect(screen.getByTestId('modal-add-cart')).toBeInTheDocument();
    expect(screen.getByTestId('modal-add-cart-success')).toBeInTheDocument();
  });
});
