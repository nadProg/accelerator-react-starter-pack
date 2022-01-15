import { act, render } from '@testing-library/react';
import { datatype } from 'faker';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { State } from '../../types/store';
import { createMockState } from '../../mock/state';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import ReviewSection from './review-section';
import { createMockGuitarWithComments } from '../../mock/guitar';
import { FetchStatus } from '../../constants/common';
import { asyncDelay } from '../../utils/common';

const mockGuitar = createMockGuitarWithComments(datatype.number());

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

    expect(screen.queryByTestId('modal-review-form')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('button-add-review'));
    expect(screen.getByTestId('modal-review-form')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('modal-overlay'));
    expect(screen.queryByTestId('modal-review-form')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('button-add-review'));
    expect(screen.getByTestId('modal-review-form')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('modal-button-close'));
    expect(screen.queryByTestId('modal-review-form')).not.toBeInTheDocument();
  });

  it('should handle success modal open after success new review submit', async () => {
    const mockSucceededStore = configureMockStore<State>(middlewares)({
      ...mockState,
      comments: {
        newComment: {
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

    expect(screen.queryByTestId('modal-review-form')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('modal-success-review'),
    ).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('button-add-review'));

    await act(async () => {
      await asyncDelay(0);
    });

    expect(screen.getByTestId('modal-success-review')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('modal-button-close'));

    expect(screen.queryByTestId('modal-success-review')).not.toBeInTheDocument();
  });
});
