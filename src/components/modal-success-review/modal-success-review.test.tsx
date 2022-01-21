import {render} from '@testing-library/react';
import { screen } from '@testing-library/react';
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
});
