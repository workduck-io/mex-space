import { expect, test } from 'vitest'

import { generateEntities } from '../entities'

test('Entities function run', () => {
  expect<string>(generateEntities()).toEqual('Hello')
})
