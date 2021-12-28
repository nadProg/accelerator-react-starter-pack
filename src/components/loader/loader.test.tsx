import {render} from '@testing-library/react';
import Loader from './loader';

describe('Component: Loader', () => {
  it('should render without errors', () => {
    render(
      <Loader />,
    );
  });
});
