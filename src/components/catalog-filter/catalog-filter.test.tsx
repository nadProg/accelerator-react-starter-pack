import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
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
  AddFilterGuitarType,
  AddFilterStringCount,
  RemoveFilterGuitarType,
  RemoveFilterStringCount,
  SetFilterMaxPrice,
  SetFilterMinPrice
} from '../../store/filter/filter-actions';
import { AppRoute } from '../../constants/endpoints';
import { createArrayOfObjects } from '../../utils/common';
import { createMockGuitar } from '../../mock/guitar';

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

  it('should handle handle select checkboxes when no guitar types selected', () => {
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
      AddFilterGuitarType(GuitarTypeValue.Acoustic),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      AddFilterGuitarType(GuitarTypeValue.Electric),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      AddFilterGuitarType(GuitarTypeValue.Ukulele),
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

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      AddFilterStringCount(STRING_COUNT_VALUES[0]),
    );
    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      AddFilterStringCount(STRING_COUNT_VALUES[1]),
    );
    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      AddFilterStringCount(STRING_COUNT_VALUES[2]),
    );
    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      AddFilterStringCount(STRING_COUNT_VALUES[3]),
    );
  });

  it('should handle handle select stringCounts checkboxes when all guitar types selected', () => {
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
      AddFilterStringCount(STRING_COUNT_VALUES[0]),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      AddFilterStringCount(STRING_COUNT_VALUES[1]),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      AddFilterStringCount(STRING_COUNT_VALUES[2]),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      AddFilterStringCount(STRING_COUNT_VALUES[3]),
    );
  });

  it('should handle deselect checkboxes when all checkoxes are selected', () => {
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
      RemoveFilterGuitarType(GuitarTypeValue.Acoustic),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      RemoveFilterGuitarType(GuitarTypeValue.Electric),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      RemoveFilterGuitarType(GuitarTypeValue.Ukulele),
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
      RemoveFilterStringCount(STRING_COUNT_VALUES[0]),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      RemoveFilterStringCount(STRING_COUNT_VALUES[1]),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      RemoveFilterStringCount(STRING_COUNT_VALUES[2]),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      RemoveFilterStringCount(STRING_COUNT_VALUES[3]),
    );
  });

  it('should update stringCounts when guitar types is changed', () => {
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
      RemoveFilterStringCount(STRING_COUNT_VALUES[1]),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      RemoveFilterStringCount(STRING_COUNT_VALUES[2]),
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      RemoveFilterStringCount(STRING_COUNT_VALUES[3]),
    );
  });

  it('should handle price inputs', () => {
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

    expect(mockStore.dispatch).toHaveBeenCalledWith(SetFilterMinPrice(1));
    expect(mockStore.dispatch).toHaveBeenCalledWith(SetFilterMinPrice(2));
    expect(mockStore.dispatch).toHaveBeenCalledWith(SetFilterMinPrice(3));

    userEvent.type(screen.getByTestId('max-price-input'), '456');

    expect(mockStore.dispatch).toHaveBeenCalledWith(SetFilterMaxPrice(4));
    expect(mockStore.dispatch).toHaveBeenCalledWith(SetFilterMaxPrice(5));
    expect(mockStore.dispatch).toHaveBeenCalledWith(SetFilterMaxPrice(6));
  });

  it('should handle incorrect max price input', () => {
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

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      SetFilterMaxPrice(mockMinPrice),
    );
  });

  it('should handle incorrect min price input', () => {
    const mockMaxPrice = 1;
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

    userEvent.type(screen.getByTestId('min-price-input'), '9');

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      SetFilterMinPrice(mockMaxPrice),
    );
  });

  it('should handle empty input', () => {
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
    userEvent.type(screen.getByTestId('max-price-input'), '{backspace}');

    expect(mockStore.dispatch).toHaveBeenCalledWith(SetFilterMinPrice(''));
    expect(mockStore.dispatch).toHaveBeenCalledWith(SetFilterMaxPrice(''));
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
    });

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
  });
});
