
import { act, render
} from '@testing-library/react';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { State } from '../../types/store';
import { createMockState } from '../../mock/state';
import CatalogPagination from './catalog-pagination';
import { DEBOUNCE_TIME, FetchStatus } from '../../constants/common';
import { asyncDelay, createArrayOfObjects } from '../../utils/common';
import { createMockGuitarWithComments } from '../../mock/guitar';
import { CATALOG_PAGE_SIZE } from '../../constants/pagination';
import { AppRoute } from '../../constants/endpoints';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setCatalogGuitarsStatus } from '../../store/guitars/guitars-actions';
import { setPaginationCurrentPage } from '../../store/pagination/pagination-actions';

const mockState = createMockState();

const mockHistory = createMemoryHistory();

const mockMaxPage = 7;
const mockTotalAmount = CATALOG_PAGE_SIZE * mockMaxPage;
const mockCurrentPage = 5;

let mockStore: MockStore<State>;

describe('Component: CatalogPagination', () => {
  beforeEach(() => {
    mockHistory.push(AppRoute.CatalogPage(mockCurrentPage));

    mockStore = configureMockStore<State>()({
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
  });

  it('should render correctly with prev and next buttons', () => {
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
    expect(screen.queryByTestId(`${mockCurrentPage - 2}-page-link`)).not.toBeInTheDocument();
    expect(screen.queryByTestId(`${mockCurrentPage + 2}-page-link`)).not.toBeInTheDocument();
  });


  it('should render correctly without prev button', () => {
    mockHistory.push(AppRoute.CatalogPage(1));

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
    expect(screen.getByTestId('1-page-link')).toBeInTheDocument();
    expect(screen.getByTestId('2-page-link')).toBeInTheDocument();
    expect(screen.getByTestId('3-page-link')).toBeInTheDocument();
    expect(screen.queryByTestId('4-page-link')).not.toBeInTheDocument();
    expect(screen.queryByTestId('5-page-link')).not.toBeInTheDocument();
    expect(screen.queryByTestId('6-page-link')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prev-page-link')).not.toBeInTheDocument();
  });

  it('should render correctly without next button', () => {
    mockHistory.push(AppRoute.CatalogPage(7));

    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <Route path={AppRoute.CatalogPage()} exact>
            <CatalogPagination />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('prev-page-link')).toBeInTheDocument();
    expect(screen.queryByTestId('next-page-link')).not.toBeInTheDocument();
    expect(screen.getByTestId('7-page-link')).toBeInTheDocument();
    expect(screen.queryByTestId('5-page-link')).not.toBeInTheDocument();
    expect(screen.queryByTestId('6-page-link')).not.toBeInTheDocument();
    expect(screen.queryByTestId('8-page-link')).not.toBeInTheDocument();
    expect(screen.queryByTestId('9-page-link')).not.toBeInTheDocument();
    expect(screen.queryByTestId('6-page-link')).not.toBeInTheDocument();
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

    userEvent.click(screen.getByTestId('next-page-link'));

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });

    userEvent.click(screen.getByTestId('prev-page-link'));

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });

    userEvent.click(screen.getByTestId(`${mockCurrentPage - 1}-page-link`));

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });

    userEvent.click(screen.getByTestId(`${mockCurrentPage + 1}-page-link`));

    await act(async () => {
      await asyncDelay(DEBOUNCE_TIME);
    });
  });
});
