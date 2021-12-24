import { configureMockStore } from '@jedmao/redux-mock-store';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { KeyCode } from '../../constants/common';
import { createMockGuitar } from '../../mock/guitar';
import { State } from '../../types/store';
import { createArrayOfObjects } from '../../utils/common';
import userEvent from '@testing-library/user-event';
import FormSearch from './form-search';
import { lorem } from 'faker';
import { createMockState } from '../../mock/state';

const FOUND_GUITARS_AMOUNT = 10;

const mockState = createMockState();

const mockFilledState: State = {
  ...mockState,
  guitars: {
    ...mockState.guitars,
    foundGuitars: {
      data: createArrayOfObjects(createMockGuitar, FOUND_GUITARS_AMOUNT),
    },
  },
};

const mockNullState: State = {
  ...mockState,
  guitars: {
    ...mockState.guitars,
    foundGuitars: {
      data: null,
    },
  },
};

const mockEmptyState: State = {
  ...mockState,
  guitars: {
    ...mockState.guitars,
    foundGuitars: {
      data: [],
    },
  },
};

const mockHistory = createMemoryHistory();

describe('Component: FormSearch', () => {
  it('should render without errors', () => {
    const mockStore = configureMockStore<State>()(mockFilledState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <FormSearch />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('search-input'));

    expect(screen.getAllByTestId('found-guitar-link')).toHaveLength(FOUND_GUITARS_AMOUNT);
  });

  it('should render without errors with null data', () => {
    const mockStore = configureMockStore<State>()(mockNullState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <FormSearch />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('search-input'));
  });

  it('should render without errors with empty array', () => {
    const mockStore = configureMockStore<State>()(mockEmptyState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <FormSearch />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('search-input'));
  });

  it('should handle keydown interactions', () => {
    const mockStore = configureMockStore<State>()(mockFilledState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <FormSearch />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('search-input'));

    fireEvent.keyDown(screen.getByTestId('search-input'), {
      code: KeyCode.ArrowDown,
    });
    fireEvent.keyDown(screen.getByTestId('search-input'), {
      code: KeyCode.ArrowDown,
    });
    fireEvent.keyDown(screen.getByTestId('search-input'), {
      code: KeyCode.ArrowDown,
    });
    fireEvent.keyDown(screen.getByTestId('search-input'), {
      code: KeyCode.ArrowDown,
    });
    fireEvent.keyDown(screen.getByTestId('search-input'), {
      code: KeyCode.ArrowDown,
    });
    fireEvent.keyDown(screen.getByTestId('search-input'), {
      code: KeyCode.ArrowRight,
    });
    fireEvent.keyDown(screen.getByTestId('search-input'), {
      code: KeyCode.ArrowLeft,
    });
    fireEvent.keyDown(screen.getByTestId('search-input'), {
      code: KeyCode.ArrowUp,
    });
    fireEvent.keyDown(screen.getByTestId('search-input'), {
      code: KeyCode.Enter,
    });
  });

  it('should handle typing interactions', () => {
    const mockStore = configureMockStore<State>()(mockFilledState);
    mockStore.dispatch = jest.fn();
    const mockText = lorem.word();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <FormSearch />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('search-input'));

    userEvent.type(screen.getByTestId('search-input'), mockText);
    expect(mockStore.dispatch).toBeCalledTimes(mockText.length);
  });

  it('should handle window click interaction', () => {
    const mockStore = configureMockStore<State>()(mockFilledState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <FormSearch />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('search-input'));

    act(() => {
      userEvent.click(document.body);
    });
  });

  it('should handle link click interaction', () => {
    const mockStore = configureMockStore<State>()(mockFilledState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <FormSearch />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('search-input'));

    userEvent.click(screen.getAllByTestId('found-guitar-link')[0]);
  });


  it('should handle submit correctly', () => {
    const mockStore = configureMockStore<State>()(mockFilledState);
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <FormSearch />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('search-input'));
    userEvent.click(screen.getByTestId('search-submit-button'));
  });
});
