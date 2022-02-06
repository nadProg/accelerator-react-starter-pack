import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, within} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { FetchStatus } from '../../constants/common';
import { createMockGuitarWithReviews } from '../../mock/guitar';
import { State } from '../../types/store';
import { createArrayOfObjects } from '../../utils/common';
import CatalogPage from './catalog-page';
import { screen } from '@testing-library/react';
import { createMockState } from '../../mock/state';
import userEvent from '@testing-library/user-event';

const mockGuitars = createArrayOfObjects(() => createMockGuitarWithReviews(), 9);

const mockState = createMockState();

const mockIdleState: State = {
  ...mockState,
  guitars: {
    ...mockState.guitars,
    catalogGuitars: {
      data: null,
      status: FetchStatus.Idle,
    },
  },
};

const mockLoadingState: State = {
  ...mockState,
  guitars: {
    ...mockState.guitars,
    catalogGuitars: {
      data: null,
      status: FetchStatus.Loading,
    },
  },
};

const mockSucceedState: State = {
  ...mockState,
  guitars: {
    ...mockState.guitars,
    catalogGuitars: {
      data: mockGuitars,
      status: FetchStatus.Succeeded,
    },
  },
};

const mockFailedState: State = {
  ...mockState,
  guitars: {
    ...mockState.guitars,
    catalogGuitars: {
      data: mockGuitars,
      status: FetchStatus.Failed,
    },
  },
};

const mockHistory = createMemoryHistory();

describe('Component: CatalogPage', () => {
  it('should render before server request', () => {
    const mockStore = configureMockStore<State>()(mockIdleState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogPage />
        </Router>
      </Provider>,
    );

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should render during server response', () => {
    const mockStore = configureMockStore<State>()(mockLoadingState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogPage />
        </Router>
      </Provider>,
    );
  });

  it('should render after succeed server response', () => {
    const mockStore = configureMockStore<State>()(mockSucceedState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogPage />
        </Router>
      </Provider>,
    );
  });

  it('should render after failed server response', () => {
    const mockStore = configureMockStore<State>()(mockFailedState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogPage />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('catalog-error-message')).toBeInTheDocument();
  });

  it('should handle null succeed response', () => {
    const mockStore = configureMockStore<State>()({
      guitars: {
        ...mockSucceedState.guitars,
        catalogGuitars: {
          data: null,
          status: FetchStatus.Succeeded,
        },
      },
    });

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogPage />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('catalog-error-message')).toBeInTheDocument();
  });

  it('should handle add item modal', () => {
    const mockStore = configureMockStore<State>()({
      guitars: {
        ...mockSucceedState.guitars,
        catalogGuitars: {
          data: mockGuitars,
          status: FetchStatus.Succeeded,
        },
      },
      cart: {
        items: [],
      },
    });

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogPage />
        </Router>
      </Provider>,
    );

    const modal = screen.getByTestId('modal-add-cart-item');

    expect(modal).toBeInTheDocument();
    expect(modal).not.toHaveClass('is-active');

    const mockCurrentCard = screen.getAllByTestId('product-card')[5];

    userEvent.click(within(mockCurrentCard).getByTestId('product-card-add-cart-item-btn'));

    expect(modal).toHaveClass('is-active');

    userEvent.click(within(modal).getByTestId('modal-overlay'));

    expect(modal).not.toHaveClass('is-active');
  });
});
