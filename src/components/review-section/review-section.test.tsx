import { render, within } from '@testing-library/react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { State } from '../../types/store';
import { createMockState } from '../../mock/state';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import ReviewSection from './review-section';
import { createMockGuitarWithReviews } from '../../mock/guitar';
import { FetchStatus } from '../../constants/common';

const mockGuitar = createMockGuitarWithReviews(10);

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockState = createMockState();
const mockStore = configureMockStore<State>(middlewares)(mockState);

describe('Component: ReviewSection', () => {
  it('should render without errors', () => {
    render(
      <Provider store={mockStore}>
        <ReviewSection guitar={mockGuitar} />
      </Provider>,
    );
  });

  it('should handle open/close review-form modal', () => {
    render(
      <Provider store={mockStore}>
        <ReviewSection guitar={mockGuitar} />
      </Provider>,
    );

    const modal = screen.getByTestId('modal-add-review');

    expect(modal).not.toHaveClass('is-active');

    userEvent.click(screen.getByTestId('button-add-review'));
    expect(modal).toHaveClass('is-active');

    userEvent.click(within(modal).getByTestId('modal-overlay'));
    expect(modal).not.toHaveClass('is-active');
  });

  it('should handle success modal open after success new review submit', async () => {
    const mockSucceededStore = configureMockStore<State>(middlewares)({
      ...mockState,
      reviews: {
        newReview: {
          status: FetchStatus.Succeeded,
        },
      },
    });

    mockSucceededStore.dispatch = jest.fn();

    render(
      <Provider store={mockSucceededStore}>
        <ReviewSection guitar={mockGuitar} />
      </Provider>,
    );

    expect(screen.getByTestId('modal-add-review')).not.toHaveClass(
      'is-active',
    );

    userEvent.click(screen.getByTestId('button-add-review'));

    const modal = screen.getByTestId('modal-add-review-success');

    expect(modal).toHaveClass('is-active');

    userEvent.click(within(modal).getByTestId('modal-overlay'));

    expect(modal).not.toHaveClass('is-active');
  });
});
