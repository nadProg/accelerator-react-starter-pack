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
import CardScreen from './card-screen';
import ReactRouter, { Route } from 'react-router';
import { screen } from '@testing-library/react';
import { createMockState } from '../../mock/state';
import userEvent from '@testing-library/user-event';

const mockGuitar = createMockGuitarWithComments();
const mockState = createMockState();

const mockIdleState: State = {
  ...mockState,
  guitars: {
    ...mockState.guitars,
    currentGuitar: {
      data: null,
      status: FetchStatus.Idle,
    },
  },
};

const mockLoadingState: State = {
  ...mockState,
  guitars: {
    ...mockState.guitars,
    currentGuitar: {
      data: null,
      status: FetchStatus.Loading,
    },
  },
};

const mockSucceedState: State = {
  ...mockState,
  guitars: {
    ...mockState.guitars,
    currentGuitar: {
      data: mockGuitar,
      status: FetchStatus.Succeeded,
    },
  },
};

const mockFailedState: State = {
  ...mockState,
  guitars: {
    ...mockState.guitars,
    currentGuitar: {
      data: mockGuitar,
      status: FetchStatus.Failed,
    },
  },
};

const mockHistory = createMemoryHistory();

const mockId = datatype.number();

describe('Component: CardScreen', () => {
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
          <CardScreen />
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
          <CardScreen />
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
          <CardScreen />
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
            <CardScreen />
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
            <CardScreen />
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
            <CardScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  it('should handle open/close add-to-card modal', () => {
    const mockStore = configureMockStore<State>()(mockSucceedState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CardScreen />
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId('modal-cart-add')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('button-add-to-cart'));
    expect(screen.getByTestId('modal-cart-add')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('modal-overlay'));
    expect(screen.queryByTestId('modal-cart-add')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('button-add-to-cart'));
    expect(screen.getByTestId('modal-cart-add')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('modal-button-close'));
    expect(screen.queryByTestId('modal-cart-add')).not.toBeInTheDocument();
  });

  it('should handle open/close review-form modal', () => {
    const mockStore = configureMockStore<State>()(mockSucceedState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CardScreen />
        </Router>
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

  it('should handle success modal open after success new review submit', () => {
    const mockStore = configureMockStore<State>()(mockSucceedState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CardScreen />
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId('modal-review-form')).not.toBeInTheDocument();
    expect(screen.queryByTestId('modal-success-review')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('button-add-review'));
    expect(screen.getByTestId('modal-review-form')).toBeInTheDocument();
    expect(screen.queryByTestId('modal-success-review')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('submit-new-review'));
    expect(screen.queryByTestId('modal-review-form')).not.toBeInTheDocument();
    expect(screen.getByTestId('modal-success-review')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('modal-button-close'));
    expect(screen.queryByTestId('modal-success-review')).not.toBeInTheDocument();
  });

  it('should handle guitar tab switching', () => {
    const mockStore = configureMockStore<State>()(mockSucceedState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CardScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('characteristics-tab-control')).toBeInTheDocument();
    expect(screen.getByTestId('description-tab-control')).toBeInTheDocument();

    expect(screen.getByTestId('characteristics-tab-content')).toBeInTheDocument();
    expect(screen.queryByTestId('description-tab-content')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('characteristics-tab-control'));
    expect(screen.getByTestId('characteristics-tab-content')).toBeInTheDocument();
    expect(screen.queryByTestId('description-tab-content')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('description-tab-control'));
    expect(screen.queryByTestId('characteristics-tab-content')).not.toBeInTheDocument();
    expect(screen.getByTestId('description-tab-content')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('description-tab-control'));
    expect(screen.queryByTestId('characteristics-tab-content')).not.toBeInTheDocument();
    expect(screen.getByTestId('description-tab-content')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('characteristics-tab-control'));
    expect(screen.getByTestId('characteristics-tab-content')).toBeInTheDocument();
    expect(screen.queryByTestId('description-tab-content')).not.toBeInTheDocument();
  });
});
