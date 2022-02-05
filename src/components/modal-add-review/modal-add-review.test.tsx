import { configureMockStore } from '@jedmao/redux-mock-store';
import {render} from '@testing-library/react';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMockGuitarWithReviews } from '../../mock/guitar';
import { createMockState } from '../../mock/state';
import { State } from '../../types/store';
import ModalAddReview from './modal-add-review';

const mockState = createMockState();
const mockStore = configureMockStore<State>()(mockState);

mockStore.dispatch = jest.fn();

const mockOnClose = jest.fn();

const mockGuitar = createMockGuitarWithReviews();

const mockHistory = createMemoryHistory();

describe('Component: ModalAddReview', () => {
  it('should render without errors', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <ModalAddReview guitar={mockGuitar} isActive onClose={mockOnClose} />
        </Provider>
      </Router>,
    );

    expect(screen.getByTestId('modal-add-review')).toBeInTheDocument();
    expect(screen.getByTestId('modal-add-review-success')).toBeInTheDocument();
  });
});
