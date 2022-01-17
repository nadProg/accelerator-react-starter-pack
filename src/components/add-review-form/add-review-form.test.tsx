import { render } from '@testing-library/react';
import { datatype } from 'faker';
import AddReviewForm from './add-review-form';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { State } from '../../types/store';
import { createMockState } from '../../mock/state';
import { createAPI } from '../../services/api';
import { screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { FetchStatus } from '../../constants/common';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockState = createMockState();
const mockStore = configureMockStore<State>(middlewares)(mockState);

mockStore.dispatch = jest.fn();

const mockGuitarId = datatype.number();
const mockOnSuccessSubmitting = jest.fn();

describe('Component: AddReviewForm', () => {
  it('should render without errors', () => {
    render(
      <Provider store={mockStore}>
        <AddReviewForm
          guitarId={mockGuitarId}
          onSuccessSubmitting={mockOnSuccessSubmitting}
        />
      </Provider>,
    );
  });

  it('should handle valid form submit', () => {
    render(
      <Provider store={mockStore}>
        <AddReviewForm
          guitarId={mockGuitarId}
          onSuccessSubmitting={mockOnSuccessSubmitting}
        />
      </Provider>,
    );

    expect(screen.queryByTestId('username-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('rating-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('advantage-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('disadvantage-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('comment-error')).not.toBeInTheDocument();

    userEvent.type(screen.getByLabelText(/имя/i), 'имя');
    userEvent.click(screen.getByLabelText(/отлично/i));
    userEvent.type(screen.getByLabelText(/достоинства/i), 'достоинство');
    userEvent.type(screen.getByLabelText(/недостатки/i), 'недостаток');
    userEvent.type(screen.getByLabelText(/комментарий/i), 'комментарий');

    userEvent.click(screen.getByText(/Отправить отзыв/i));

    expect(screen.queryByTestId('username-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('rating-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('advantage-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('disadvantage-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('comment-error')).not.toBeInTheDocument();

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockOnSuccessSubmitting).not.toBeCalled();
  });

  it('should handle success submitting callback', () => {
    const mockSucceedStore = configureMockStore<State>(middlewares)({
      ...mockState,
      reviews: {
        newReview: {
          status: FetchStatus.Succeeded,
        },
      },
    });

    mockSucceedStore.dispatch = jest.fn();

    render(
      <Provider store={mockSucceedStore}>
        <AddReviewForm
          guitarId={mockGuitarId}
          onSuccessSubmitting={mockOnSuccessSubmitting}
        />
      </Provider>,
    );

    expect(mockSucceedStore.dispatch).not.toBeCalled();
    expect(mockOnSuccessSubmitting).toHaveBeenCalledTimes(1);
  });

  it('should handle failed submit', () => {
    const mockFailedStore = configureMockStore<State>(middlewares)({
      ...mockState,
      reviews: {
        newReview: {
          status: FetchStatus.Failed,
        },
      },
    });

    mockFailedStore.dispatch = jest.fn();

    render(
      <Provider store={mockFailedStore}>
        <AddReviewForm
          guitarId={mockGuitarId}
          onSuccessSubmitting={mockOnSuccessSubmitting}
        />
      </Provider>,
    );

    expect(mockFailedStore.dispatch).not.toBeCalled();
    expect(mockOnSuccessSubmitting).not.toBeCalled();
  });

  it('should prevent invalid form submit', () => {
    render(
      <Provider store={mockStore}>
        <AddReviewForm
          guitarId={mockGuitarId}
          onSuccessSubmitting={mockOnSuccessSubmitting}
        />
      </Provider>,
    );

    expect(screen.queryByTestId('username-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('rating-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('advantage-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('disadvantage-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('comment-error')).not.toBeInTheDocument();

    userEvent.click(screen.getByText(/Отправить отзыв/i));

    expect(screen.getByTestId('username-error')).toBeInTheDocument();
    expect(screen.getByTestId('rating-error')).toBeInTheDocument();
    expect(screen.getByTestId('advantage-error')).toBeInTheDocument();
    expect(screen.getByTestId('disadvantage-error')).toBeInTheDocument();
    expect(screen.getByTestId('comment-error')).toBeInTheDocument();

    expect(mockStore.dispatch).not.toBeCalled();
    expect(mockOnSuccessSubmitting).not.toBeCalled();
  });

  it('should disable submit button while sending request', () => {
    const mockLoadingStore = configureMockStore<State>(middlewares)({
      ...mockState,
      reviews: {
        newReview: {
          status: FetchStatus.Loading,
        },
      },
    });

    mockLoadingStore.dispatch = jest.fn();

    render(
      <Provider store={mockLoadingStore}>
        <AddReviewForm
          guitarId={mockGuitarId}
          onSuccessSubmitting={mockOnSuccessSubmitting}
        />
      </Provider>,
    );

    expect(screen.queryByText(/Отправить отзыв/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Отправка/i)).toBeInTheDocument();
    expect(screen.getByText(/Отправка/i)).toHaveAttribute('disabled');

    userEvent.click(screen.getByText(/Отправка/i));
    userEvent.click(screen.getByText(/Отправка/i));

    expect(mockStore.dispatch).not.toBeCalled();
    expect(mockOnSuccessSubmitting).not.toBeCalled();
  });
});
