import { expect, test } from 'vitest'

import { generateEntities } from '../entities'

test('Entities function run', async () => {
  expect<string>(await generateEntities()).toEqual('Hello')
}, 100000)
