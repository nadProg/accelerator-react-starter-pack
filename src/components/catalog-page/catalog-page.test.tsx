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

const mockGuitars = createArrayOfObjects(createMockGuitarWithComments, 9);

const mockIdleState: State = {
  guitars: {
    catalogGuitars: {
      data: null,
      status: FetchStatus.Idle,
    },
    currentGuitar: {
      data: null,
      status: FetchStatus.Idle,
    },
    foundGuitars: {
      data: null,
    },
  },
};

const mockLoadingState: State = {
  guitars: {
    catalogGuitars: {
      data: null,
      status: FetchStatus.Loading,
    },
    currentGuitar: {
      data: null,
      status: FetchStatus.Idle,
    },
    foundGuitars: {
      data: null,
    },
  },
};

const mockSucceedState: State = {
  guitars: {
    catalogGuitars: {
      data: mockGuitars,
      status: FetchStatus.Succeeded,
    },
    currentGuitar: {
      data: null,
      status: FetchStatus.Idle,
    },
    foundGuitars: {
      data: null,
    },
  },
};

const mockFailedState: State = {
  guitars: {
    catalogGuitars: {
      data: mockGuitars,
      status: FetchStatus.Failed,
    },
    currentGuitar: {
      data: null,
      status: FetchStatus.Idle,
    },
    foundGuitars: {
      data: null,
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
