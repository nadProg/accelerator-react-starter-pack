import { render, screen } from '@testing-library/react';
import Rating from './rating';

describe('Component: Rating', () => {
  it('should render correctly with value = 0', () => {
    const mockValue = 0;
    render(<Rating value={mockValue} />);
    expect(screen.queryAllByTestId(/full-star/i)).toHaveLength(mockValue);
  });

  it('should render correctly with value < 0', () => {
    const mockValue = -5;
    render(<Rating value={mockValue} />);
    expect(screen.queryAllByTestId(/full-star/i)).toHaveLength(0);
  });

  it('should render correctly with value 3', () => {
    const mockValue = 3;
    render(<Rating value={mockValue} />);
    expect(screen.queryAllByTestId(/full-star/i)).toHaveLength(3);
  });

  it('should render correctly with value 3.25', () => {
    const mockValue = 3.25;
    render(<Rating value={mockValue} />);
    expect(screen.queryAllByTestId(/full-star/i)).toHaveLength(3);
  });

  it('should render correctly with value 3.5', () => {
    const mockValue = 3.5;
    render(<Rating value={mockValue} />);
    expect(screen.queryAllByTestId(/full-star/i)).toHaveLength(4);
  });

  it('should render correctly with value 3.75', () => {
    const mockValue = 3.75;
    render(<Rating value={mockValue} />);
    expect(screen.queryAllByTestId(/full-star/i)).toHaveLength(4);
  });

  it('should render correctly with value 4', () => {
    const mockValue = 4;
    render(<Rating value={mockValue} />);
    expect(screen.queryAllByTestId(/full-star/i)).toHaveLength(4);
  });

  it('should render correctly with value >= 5', () => {
    const mockValue = 10;
    render(<Rating value={mockValue} />);
    expect(screen.queryAllByTestId(/full-star/i)).toHaveLength(5);
  });
});
