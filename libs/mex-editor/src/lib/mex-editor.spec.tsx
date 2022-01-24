import { render } from '@testing-library/react';

import MexEditor from './mex-editor';

describe('MexEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MexEditor />);
    expect(baseElement).toBeTruthy();
  });
});
