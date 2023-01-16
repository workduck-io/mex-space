import { expect, test } from 'vitest'

import { helloWorld } from '../src'

test('Hello World function returns', () => {
  expect<string>(helloWorld()).toEqual('Hello World from mex-search!')
})
