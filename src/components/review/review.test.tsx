import {render} from '@testing-library/react';
import { createMockReview } from '../../mock/review';
import Review from './review';


const mockReview = createMockReview();

describe('Component: Review', () => {
  it('should render without errors', () => {
    render(
      <Review review={mockReview} />,
    );
  });
});
