import {render} from '@testing-library/react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalSuccessReview from './modal-success-review';

const mockOnClose = jest.fn();

describe('Component: ModalSuccessReview', () => {
  it('should render without errors', () => {
    render(
      <ModalSuccessReview onClose={mockOnClose} />,
    );

    expect(screen.getByTestId('success-button-confirm')).toBeInTheDocument();
    expect(screen.getByTestId('modal-button-close')).toBeInTheDocument();
  });

  it('should handle focus loop', () => {
    render(
      <ModalSuccessReview onClose={mockOnClose} />,
    );

    expect(screen.getByTestId('success-button-confirm')).toHaveFocus();
    expect(screen.getByTestId('modal-button-close')).not.toHaveFocus();

    userEvent.tab();

    expect(screen.getByTestId('success-button-confirm')).not.toHaveFocus();
    expect(screen.getByTestId('modal-button-close')).toHaveFocus();

    userEvent.tab();

    expect(screen.getByTestId('success-button-confirm')).toHaveFocus();
    expect(screen.getByTestId('modal-button-close')).not.toHaveFocus();

    userEvent.tab();

    expect(screen.getByTestId('success-button-confirm')).not.toHaveFocus();
    expect(screen.getByTestId('modal-button-close')).toHaveFocus();
  });
});
