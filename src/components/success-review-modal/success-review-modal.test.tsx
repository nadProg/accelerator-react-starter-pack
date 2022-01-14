import {render} from '@testing-library/react';
import SuccessReviewModal from './success-review-modal';

const mockOnClose = jest.fn();

describe('Component: SuccessReviewModal', () => {
  it('should render without errors', () => {
    render(
      <SuccessReviewModal onClose={mockOnClose} />,
    );
  });
});
