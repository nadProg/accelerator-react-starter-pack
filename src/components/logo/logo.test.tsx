import { render, screen } from '@testing-library/react';
import Logo from './logo';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(<Logo />);

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
  });
});
