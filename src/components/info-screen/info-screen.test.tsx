import { render, screen } from '@testing-library/react';
import InfoScreen from './info-screen';

describe('Component: InfoScreen', () => {
  it('should render correctly', () => {
    render(
      <InfoScreen>
        <div data-testid="children" />
      </InfoScreen>,
    );

    expect(screen.getByTestId(/children/i)).toBeInTheDocument();
  });

  it('should render without children correctly', () => {
    render(
      <InfoScreen />,
    );

    expect(screen.queryByTestId(/children/i)).not.toBeInTheDocument();
  });
});
