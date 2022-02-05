import { configureMockStore } from '@jedmao/redux-mock-store';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createMockState } from '../../mock/state';
import { createAPI } from '../../services/api';
import { State } from '../../types/store';
import CatalogFilter from './catalog-filter';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { GuitarTypeValue, STRING_COUNT_VALUES } from '../../constants/guitar';
import {
  addFilterGuitarType,
  addFilterStringCount,
  removeFilterGuitarType,
  removeFilterStringCount,
  setFilterMaxPrice,
  setFilterMinPrice
} from '../../store/filter/filter-actions';
import { AppRoute } from '../../constants/endpoints';
import { asyncDelay, createArrayOfObjects } from '../../utils/common';
import { createMockGuitar } from '../../mock/guitar';
import { DEBOUNCE_TIME, KeyCode } from '../../constants/common';

const mockHistory = createMemoryHistory();

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockState = createMockState();

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    const mockStore = configureMockStore<State>(middlewares)(mockState);

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogFilter />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('min-price-input')).toBeInTheDocument();
    expect(screen.getByTestId('max-price-input')).toBeInTheDocument();

    expect(screen.getByTestId('min-price-input')).toHaveAttribute(
      'placeholder',
      '',
    );
    expect(screen.getByTestId('max-price-input')).toHaveAttribute(
      'placeholder',
      '',
    );

    expect(
      screen.getByTestId(`${GuitarTypeValue.Acoustic}-checkbox`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${GuitarTypeValue.Electric}-checkbox`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${GuitarTypeValue.Ukulele}-checkbox`),
    ).toBeInTheDocument();

    expect(
      screen.getByTestId(`${STRING_COUNT_VALUES[0]}-strings-checkbox`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${STRING_COUNT_VALUES[1]}-strings-checkbox`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${STRING_COUNT_VALUES[2]}-strings-checkbox`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${STRING_COUNT_VALUES[3]}-strings-checkbox`),
    ).toBeInTheDocument();
  });

  it('should render correctly when redirect is needed', () => {
    const mockStore = configureMockStore<State>(middlewares)({
      ...mockState,
      pagination: {
        ...mockState.pagination,
        currentPage: 10,
        maxPage: 1,
      },
    });

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogFilter />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('min-price-input')).toBeInTheDocument();
    expect(screen.getByTestId('max-price-input')).toBeInTheDocument();

    expect(screen.getByTestId('min-price-input')).toHaveAttribute(
      'placeholder',
      '',
    );
    expect(screen.getByTestId('max-price-input')).toHaveAttribute(
      'placeholder',
      '',
    );

    expect(
      screen.getByTestId(`${GuitarTypeValue.Acoustic}-checkbox`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${GuitarTypeValue.Electric}-checkbox`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${GuitarTypeValue.Ukulele}-checkbox`),
    ).toBeInTheDocument();

    expect(
      screen.getByTestId(`${STRING_COUNT_VALUES[0]}-strings-checkbox`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${STRING_COUNT_VALUES[1]}-strings-checkbox`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${STRING_COUNT_VALUES[2]}-strings-checkbox`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${STRING_COUNT_VALUES[3]}-strings-checkbox`),
    ).toBeInTheDocument();
  });

  it('should handle price inputs', async () => {
    const mockStore = configureMockStore<State>(middlewares)({
      ...mockState,
      filter: {
        ...mockState.filter,
        types: [GuitarTypeValue.Ukulele],
        stringCounts: [...STRING_COUNT_VALUES],
      },
    });

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogFilter />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('min-price-input'), '123');
    fireEvent.keyDown(screen.getByTestId('min-price-input'), {
      code: KeyCode.Enter,
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith(setFilterMinPrice(123));

    userEvent.type(screen.getByTestId('min-price-input'), '456');
    userEvent.click(screen.getByTestId('max-price-input'));

    expect(mockStore.dispatch).toHaveBeenCalledWith(setFilterMinPrice(123456));

    userEvent.type(screen.getByTestId('max-price-input'), '123');
    fireEvent.keyDown(screen.getByTestId('max-price-input'), {
      code: KeyCode.NumpadEnter,
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith(setFilterMaxPrice(123));

    userEvent.type(screen.getByTestId('max-price-input'), '456');
    userEvent.click(screen.getByTestId('min-price-input'));

    expect(mockStore.dispatch).toHaveBeenCalledWith(setFilterMaxPrice(123456));

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });
  });

  it('should prevent negative price input', async () => {
    const mockStore = configureMockStore<State>(middlewares)(mockState);

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogFilter />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('min-price-input'));
    fireEvent.keyDown(screen.getByTestId('min-price-input'), {
      code: KeyCode.Minus,
    });
    userEvent.type(screen.getByTestId('min-price-input'), '5');
    fireEvent.keyDown(screen.getByTestId('min-price-input'), {
      code: KeyCode.Enter,
    });

    userEvent.click(screen.getByTestId('max-price-input'));
    fireEvent.keyDown(screen.getByTestId('max-price-input'), {
      code: KeyCode.NumpadSubtract,
    });
    userEvent.type(screen.getByTestId('max-price-input'), '5');
    fireEvent.keyDown(screen.getByTestId('max-price-input'), {
      code: KeyCode.Enter,
    });

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(setFilterMinPrice(-5));
    expect(mockStore.dispatch).not.toHaveBeenCalledWith(setFilterMaxPrice(-5));
    expect(mockStore.dispatch).toHaveBeenCalledWith(setFilterMinPrice(5));
    expect(mockStore.dispatch).toHaveBeenCalledWith(setFilterMaxPrice(5));

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });
  });

  it('should handle max price input less than current min price', async () => {
    const mockMinPrice = 1000;
    const mockStore = configureMockStore<State>(middlewares)({
      ...mockState,
      filter: {
        ...mockState.filter,
        price: {
          min: mockMinPrice,
        },
      },
    });

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogFilter />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('max-price-input'), '1');
    fireEvent.keyDown(screen.getByTestId('max-price-input'), {
      code: KeyCode.NumpadEnter,
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith(setFilterMaxPrice(mockMinPrice));

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });
  });

  it('should handle min price input more than current max price', async () => {
    const mockMaxPrice = 1000;
    const mockStore = configureMockStore<State>(middlewares)({
      ...mockState,
      filter: {
        ...mockState.filter,
        price: {
          max: mockMaxPrice,
        },
      },
    });

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogFilter />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('min-price-input'), '100000');
    fireEvent.keyDown(screen.getByTestId('min-price-input'), {
      code: KeyCode.NumpadEnter,
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith(setFilterMinPrice(mockMaxPrice));

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });
  });

  it('should handle price input with price limits', async () => {
    const mockLimit = 1000;
    const mockStore = configureMockStore<State>(middlewares)({
      ...mockState,
      guitars: {
        ...mockState.guitars,
        allGuitars: {
          data: [
            {
              ...createMockGuitar(),
              price: mockLimit,
            },
          ],
        },
      },
    });

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogFilter />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('min-price-input'), String(mockLimit - 1));
    fireEvent.keyDown(screen.getByTestId('min-price-input'), {
      code: KeyCode.NumpadEnter,
    });


    expect(mockStore.dispatch).toHaveBeenCalledWith(setFilterMinPrice(mockLimit));

    userEvent.clear(screen.getByTestId('min-price-input'));
    userEvent.type(screen.getByTestId('min-price-input'), String(mockLimit + 1));
    fireEvent.keyDown(screen.getByTestId('min-price-input'), {
      code: KeyCode.NumpadEnter,
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith(setFilterMinPrice(mockLimit));

    userEvent.type(screen.getByTestId('max-price-input'), String(mockLimit + 1));
    fireEvent.keyDown(screen.getByTestId('max-price-input'), {
      code: KeyCode.NumpadEnter,
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith(setFilterMaxPrice(mockLimit));

    userEvent.clear(screen.getByTestId('max-price-input'));
    userEvent.type(screen.getByTestId('max-price-input'), String(mockLimit - 1));
    fireEvent.keyDown(screen.getByTestId('max-price-input'), {
      code: KeyCode.NumpadEnter,
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith(setFilterMaxPrice(mockLimit));

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });
  });

  it('should handle empty input', async () => {
    const mockStore = configureMockStore<State>(middlewares)({
      ...mockState,
      filter: {
        ...mockState.filter,
        price: {
          max: 1,
          min: 2,
        },
      },
    });

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogFilter />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('min-price-input'), '{backspace}');
    fireEvent.keyDown(screen.getByTestId('min-price-input'), {
      code: KeyCode.Enter,
    });
    userEvent.click(screen.getByTestId('max-price-input'));

    userEvent.type(screen.getByTestId('max-price-input'), '{backspace}');
    fireEvent.keyDown(screen.getByTestId('max-price-input'), {
      code: KeyCode.Enter,
    });
    userEvent.click(screen.getByTestId('min-price-input'));

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith(setFilterMinPrice(''));
    expect(mockStore.dispatch).toHaveBeenCalledWith(setFilterMaxPrice(''));
  });

  it('should render correctly when empty all guitars', () => {
    mockHistory.push(AppRoute.CatalogPage());
    const mockStore = configureMockStore<State>(middlewares)({
      ...mockState,
      guitars: {
        ...mockState.guitars,
        allGuitars: {
          data: [],
        },
      },
    });

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogFilter />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('min-price-input')).toHaveAttribute(
      'placeholder',
      '',
    );
    expect(screen.getByTestId('max-price-input')).toHaveAttribute(
      'placeholder',
      '',
    );
  });

  it('should render correctly when all guitars are loaded', () => {
    mockHistory.push(AppRoute.CatalogPage());
    const mockStore = configureMockStore<State>(middlewares)({
      ...mockState,
      guitars: {
        ...mockState.guitars,
        allGuitars: {
          data: createArrayOfObjects(createMockGuitar, 10),
        },
      },
      filter: {
        ...mockState.filter,
        price: {
          min: -1,
          max: -1,
        },
      },
    });
    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogFilter />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('min-price-input')).not.toHaveAttribute(
      'placeholder',
      '',
    );
    expect(screen.getByTestId('max-price-input')).not.toHaveAttribute(
      'placeholder',
      '',
    );

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      setFilterMinPrice(expect.any(Number)),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      setFilterMaxPrice(expect.any(Number)),
    );
  });

  it('should handle handle select checkboxes when no guitar types selected', async () => {
    const mockStore = configureMockStore<State>(middlewares)(mockState);

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogFilter />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId(`${GuitarTypeValue.Acoustic}-checkbox`));
    userEvent.click(screen.getByTestId(`${GuitarTypeValue.Electric}-checkbox`));
    userEvent.click(screen.getByTestId(`${GuitarTypeValue.Ukulele}-checkbox`));

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      addFilterGuitarType(GuitarTypeValue.Acoustic),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      addFilterGuitarType(GuitarTypeValue.Electric),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      addFilterGuitarType(GuitarTypeValue.Ukulele),
    );

    userEvent.click(
      screen.getByTestId(`${STRING_COUNT_VALUES[0]}-strings-checkbox`),
    );
    userEvent.click(
      screen.getByTestId(`${STRING_COUNT_VALUES[1]}-strings-checkbox`),
    );
    userEvent.click(
      screen.getByTestId(`${STRING_COUNT_VALUES[2]}-strings-checkbox`),
    );
    userEvent.click(
      screen.getByTestId(`${STRING_COUNT_VALUES[3]}-strings-checkbox`),
    );

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      addFilterStringCount(STRING_COUNT_VALUES[0]),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      addFilterStringCount(STRING_COUNT_VALUES[1]),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      addFilterStringCount(STRING_COUNT_VALUES[2]),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      addFilterStringCount(STRING_COUNT_VALUES[3]),
    );

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });
  });

  it('should handle handle select stringCounts checkboxes when all guitar types selected', async () => {
    const mockStore = configureMockStore<State>(middlewares)({
      ...mockState,
      filter: {
        ...mockState.filter,
        types: [...Object.values(GuitarTypeValue)],
        stringCounts: [],
      },
    });

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogFilter />
        </Router>
      </Provider>,
    );

    userEvent.click(
      screen.getByTestId(`${STRING_COUNT_VALUES[0]}-strings-checkbox`),
    );
    userEvent.click(
      screen.getByTestId(`${STRING_COUNT_VALUES[1]}-strings-checkbox`),
    );
    userEvent.click(
      screen.getByTestId(`${STRING_COUNT_VALUES[2]}-strings-checkbox`),
    );
    userEvent.click(
      screen.getByTestId(`${STRING_COUNT_VALUES[3]}-strings-checkbox`),
    );

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      addFilterStringCount(STRING_COUNT_VALUES[0]),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      addFilterStringCount(STRING_COUNT_VALUES[1]),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      addFilterStringCount(STRING_COUNT_VALUES[2]),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      addFilterStringCount(STRING_COUNT_VALUES[3]),
    );

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });
  });

  it('should handle deselect checkboxes when all checkboxes are selected', async () => {
    const mockStore = configureMockStore<State>(middlewares)({
      ...mockState,
      filter: {
        ...mockState.filter,
        types: [...Object.values(GuitarTypeValue)],
        stringCounts: [...STRING_COUNT_VALUES],
      },
    });

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogFilter />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId(`${GuitarTypeValue.Acoustic}-checkbox`));
    userEvent.click(screen.getByTestId(`${GuitarTypeValue.Electric}-checkbox`));
    userEvent.click(screen.getByTestId(`${GuitarTypeValue.Ukulele}-checkbox`));

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      removeFilterGuitarType(GuitarTypeValue.Acoustic),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      removeFilterGuitarType(GuitarTypeValue.Electric),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      removeFilterGuitarType(GuitarTypeValue.Ukulele),
    );

    userEvent.click(
      screen.getByTestId(`${STRING_COUNT_VALUES[0]}-strings-checkbox`),
    );
    userEvent.click(
      screen.getByTestId(`${STRING_COUNT_VALUES[1]}-strings-checkbox`),
    );
    userEvent.click(
      screen.getByTestId(`${STRING_COUNT_VALUES[2]}-strings-checkbox`),
    );
    userEvent.click(
      screen.getByTestId(`${STRING_COUNT_VALUES[3]}-strings-checkbox`),
    );

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      removeFilterStringCount(STRING_COUNT_VALUES[0]),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      removeFilterStringCount(STRING_COUNT_VALUES[1]),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      removeFilterStringCount(STRING_COUNT_VALUES[2]),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      removeFilterStringCount(STRING_COUNT_VALUES[3]),
    );

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });
  });

  it('should update stringCounts when guitar types is changed', async () => {
    const mockStore = configureMockStore<State>(middlewares)({
      ...mockState,
      filter: {
        ...mockState.filter,
        types: [GuitarTypeValue.Ukulele],
        stringCounts: [...STRING_COUNT_VALUES],
      },
    });

    mockStore.dispatch = jest.fn();

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <CatalogFilter />
        </Router>
      </Provider>,
    );

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      removeFilterStringCount(STRING_COUNT_VALUES[1]),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      removeFilterStringCount(STRING_COUNT_VALUES[2]),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      removeFilterStringCount(STRING_COUNT_VALUES[3]),
    );

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });
  });
});
