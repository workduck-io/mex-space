import { render } from '@testing-library/react';

import Something from './something';

describe('Something', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Something />);
    expect(baseElement).toBeTruthy();
  });
});
