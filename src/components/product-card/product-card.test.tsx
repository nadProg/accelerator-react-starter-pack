import {render} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createMockGuitarWithComments } from '../../mock/guitar';
import ProductCard from './product-card';

const mockProduct = createMockGuitarWithComments();

const mockHistory = createMemoryHistory();

describe('Component: Socials', () => {
  it('should render without errors', () => {
    render(
      <Router history={mockHistory}>
        <ProductCard product={mockProduct} />
      </Router>,
    );
  });
});
