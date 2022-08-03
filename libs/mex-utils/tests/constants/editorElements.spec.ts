import { expect, test } from 'vitest'

import { ELEMENT_DEFAULT } from '../../src/constants/editorElements'

test('Default Element must be P', () => {
  expect<string>(ELEMENT_DEFAULT).toEqual('p')
})
