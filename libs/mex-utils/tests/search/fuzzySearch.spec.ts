import { expect,test } from 'vitest'

import { fuzzySearch } from './../../src/search/fuzzySearch'

test('Fuzzy Search - Valid Case 1', () => {
  const list = ['Hullo', 'Wordl']
  const results = fuzzySearch(list, 'Hello')
  expect(results.length).toBeGreaterThan(0)
})

test('Fuzzy Search - Valid Case 2', () => {
  const list = ['Hullo', 'Wordl']
  const results = fuzzySearch(list, 'Batman')
  expect(results.length).toBe(0)
})

test('Fuzzy Search - Valid Case 3', () => {
  const list = [
    { id: 1, text: 'Hullo' },
    { id: 2, text: 'Wordl' }
  ]
  const results = fuzzySearch(list, 'Hello', (item) => item.text)
  expect(results.length).toBeGreaterThan(0)
})
