import {render} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { GuitarType } from '../../constants/constants';
import { Guitar } from '../../types/types';
import ProductCard from './product-card';

const mockProduct: Guitar = {
  id: 0,
  name: '',
  vendorCode: '',
  type: GuitarType.Electric,
  description: '',
  previewImg: '',
  stringCount: 4,
  rating: 3,
  price: 3,
  comments: [],
};

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
