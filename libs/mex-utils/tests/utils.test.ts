import { assert, expect, test } from 'vitest'

import { generateTempId } from '../src/helpers/idGenerators'
import { createGenricSearchIndex } from './../src/search/flexsearch'

// test('Math.sqrt()', () => {
//   expect(Math.sqrt(4)).toBe(2)
//   expect(Math.sqrt(144)).toBe(12)
//   expect(Math.sqrt(2)).toBe(Math.SQRT2)
// })

// test('JSON', () => {
//   const input = {
//     foo: 'hello',
//     bar: 'world'
//   }

//   const output = JSON.stringify(input)

//   expect(output).eq('{"foo":"hello","bar":"world"}')
//   assert.deepEqual(JSON.parse(output), input, 'matches original')
// })

test('Random Generator', () => {
  expect(generateTempId().length).eq(10)
})

test('Flexsearch', () => {
  const idx = createGenricSearchIndex(
    [
      { id: '1', text: 'Hello' },
      { id: '2', text: 'World' }
    ],
    undefined
  )
  console.log('Search Result: ', idx.search('Helo'))
  expect(idx).toBeTruthy()
  assert.ok(idx)
})
