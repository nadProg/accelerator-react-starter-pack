import { configureMockStore } from '@jedmao/redux-mock-store';
import {render} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { FetchStatus } from '../../constants/common';
import { createMockGuitarWithComments } from '../../mock/guitar';
import { State } from '../../types/store';
import { createArrayOfObjects } from '../../utils/common';
import CatalogPage from './catalog-page';
import { screen } from '@testing-library/react';
import { createMockState } from '../../mock/state';

const mockGuitars = createArrayOfObjects(() => createMockGuitarWithComments(), 9);

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
});
