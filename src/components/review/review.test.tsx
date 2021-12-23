import {render} from '@testing-library/react';
import { Comment } from '../../types/comment';
import Review from './review';


const mockReview: Comment = {
  id: '',
  userName: '',
  advantage: '',
  disadvantage: '',
  comment: '',
  rating: 5,
  createAt: '',
  guitarId: 2,
};

describe('Component: Review', () => {
  it('should render without errors', () => {
    render(
      <Review review={mockReview} />,
    );
  });
});
