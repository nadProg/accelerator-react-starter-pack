import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Logo from './logo';

const mockHistory = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <Router history={mockHistory}>
        <Logo />
      </Router>);

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
  });
});
