import {render} from '@testing-library/react';
import { createMockComment } from '../../mock/comment';
import Review from './review';


const mockReview = createMockComment();

describe('Component: Review', () => {
  it('should render without errors', () => {
    render(
      <Review review={mockReview} />,
    );
  });
});
