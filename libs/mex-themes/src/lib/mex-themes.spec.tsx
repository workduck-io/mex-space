import { render } from '@testing-library/react'

import MexThemes from './mex-themes'

describe('MexThemes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MexThemes />)
    expect(baseElement).toBeTruthy()
  })
})
