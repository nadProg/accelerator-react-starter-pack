import {render} from '@testing-library/react';
import ModalReviewForm from './modal-review-form';

const mockOnClose = jest.fn();
const mockOnSuccessSubmitting = jest.fn();

describe('Component: ModalReviewForm', () => {
  it('should render without errors', () => {
    render(
      <ModalReviewForm onClose={mockOnClose} onSuccessSubmitting={mockOnSuccessSubmitting}/>,
    );
  });
});
