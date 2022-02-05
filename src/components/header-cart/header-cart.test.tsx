import { configureMockStore } from '@jedmao/redux-mock-store';
import {render} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMockState } from '../../mock/state';
import { State } from '../../types/store';
import HeaderCart from './header-cart';

const mockState = createMockState();
const mockStore = configureMockStore<State>()(mockState);

const mockHistory = createMemoryHistory();

describe('Component: HeaderCart', () => {
  it('should render without errors', () => {
    render(
      <Router history={mockHistory}>
        <Provider store={mockStore}>
          <HeaderCart />
        </Provider>
      </Router>,
    );
  });
});
