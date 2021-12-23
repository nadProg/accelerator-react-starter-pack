import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { datatype } from 'faker';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { FetchStatus } from '../../constants/common';
import { AppRoute } from '../../constants/endpoints';
import { createMockGuitarWithComments } from '../../mock/guitar';
import { State } from '../../types/store';
import CardPage from './card-page';
import ReactRouter, { Route } from 'react-router';
import { screen } from '@testing-library/react';

const mockGuitar = createMockGuitarWithComments();

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
      status: FetchStatus.Idle,
    },
    currentGuitar: {
      data: null,
      status: FetchStatus.Loading,
    },
    foundGuitars: {
      data: null,
    },
  },
};

const mockSucceedState: State = {
  guitars: {
    catalogGuitars: {
      data: null,
      status: FetchStatus.Idle,
    },
    currentGuitar: {
      data: mockGuitar,
      status: FetchStatus.Succeeded,
    },
    foundGuitars: {
      data: null,
    },
  },
};

const mockFailedState: State = {
  guitars: {
    catalogGuitars: {
      data: null,
      status: FetchStatus.Idle,
    },
    currentGuitar: {
      data: mockGuitar,
      status: FetchStatus.Failed,
    },
    foundGuitars: {
      data: null,
    },
  },
};

const mockHistory = createMemoryHistory();

const mockId = datatype.number();

describe('Component: CardPage', () => {
  beforeEach(() => {
    jest
      .spyOn(ReactRouter, 'useParams')
      .mockReturnValue({ id: String(mockId) });
    mockHistory.push(AppRoute.Card());
  });

  it('should render before server request', () => {
    const mockStore = configureMockStore<State>()(mockIdleState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CardPage />
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
          <CardPage />
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
          <CardPage />
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
          <Route path={AppRoute.NotFound()} exact>
            <div data-testid="not-found" />
          </Route>
          <Route path={AppRoute.Card()} exact>
            <CardPage />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  it('should handle no guitar id', () => {
    jest
      .spyOn(ReactRouter, 'useParams')
      .mockReturnValue({ id: undefined });

    const mockStore = configureMockStore<State>()(mockFailedState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <Route path={AppRoute.NotFound()} exact>
            <div data-testid="not-found" />
          </Route>
          <Route path={AppRoute.Card()} exact>
            <CardPage />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  it('should handle null succeed response', () => {
    const mockStore = configureMockStore<State>()({
      guitars: {
        ...mockSucceedState.guitars,
        currentGuitar: {
          data: null,
          status: FetchStatus.Succeeded,
        },
      },
    });

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <Route path={AppRoute.NotFound()} exact>
            <div data-testid="not-found" />
          </Route>
          <Route path={AppRoute.Card()} exact>
            <CardPage />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});
