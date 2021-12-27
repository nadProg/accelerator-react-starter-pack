
import { act, render
} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { State } from '../../types/store';
import { createMockState } from '../../mock/state';
import CatalogPagination from './catalog-pagination';
import { asyncDelay, DEBOUNCE_TIME, FetchStatus } from '../../constants/common';
import { createArrayOfObjects } from '../../utils/common';
import { createMockGuitarWithComments } from '../../mock/guitar';
import { CATALOG_PAGE_SIZE } from '../../constants/pagination';
import { AppRoute } from '../../constants/endpoints';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setCatalogGuitarsStatus } from '../../store/guitars/guitars-actions';
import { setPaginationCurrentPage } from '../../store/pagination/pagination-actions';

const mockState = createMockState();

const mockHistory = createMemoryHistory();

const mockMaxPage = 12;
const mockTotalAmount = CATALOG_PAGE_SIZE * mockMaxPage;
const mockCurrentPage = 5;

const mockStore = configureMockStore<State>()({
  ...mockState,
  guitars: {
    ...mockState.guitars,
    catalogGuitars: {
      data: createArrayOfObjects(createMockGuitarWithComments, mockTotalAmount),
      status: FetchStatus.Succeeded,
    },
  },
  pagination: {
    currentPage: mockCurrentPage,
    maxPage: mockMaxPage,
  },
});

mockStore.dispatch = jest.fn();

describe('Component: CatalogPagination', () => {
  beforeEach(() => {
    mockHistory.push(AppRoute.CatalogPage(mockCurrentPage));
  });

  it('should render without errors', () => {


    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <Route path={AppRoute.CatalogPage()} exact>
            <CatalogPagination />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('next-page-link')).toBeInTheDocument();
    expect(screen.getByTestId('prev-page-link')).toBeInTheDocument();
    expect(screen.getByTestId(`${mockCurrentPage - 1}-page-link`)).toBeInTheDocument();
    expect(screen.getByTestId(`${mockCurrentPage}-page-link`)).toBeInTheDocument();
    expect(screen.getByTestId(`${mockCurrentPage + 1}-page-link`)).toBeInTheDocument();
  });

  it('should handle link click', async () => {
    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <Route path={AppRoute.CatalogPage()} exact>
            <CatalogPagination />
          </Route>
        </Router>
      </Provider>,
    );

    expect(mockStore.dispatch).toHaveBeenCalledWith(setPaginationCurrentPage(mockCurrentPage));

    userEvent.click(screen.getByTestId('next-page-link'));

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith(setCatalogGuitarsStatus(FetchStatus.Idle));

    userEvent.click(screen.getByTestId('prev-page-link'));

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith(setCatalogGuitarsStatus(FetchStatus.Idle));

    userEvent.click(screen.getByTestId(`${mockCurrentPage - 1}-page-link`));

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith(setCatalogGuitarsStatus(FetchStatus.Idle));

    userEvent.click(screen.getByTestId(`${mockCurrentPage + 1}-page-link`));

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith(setCatalogGuitarsStatus(FetchStatus.Idle));
  });
});
