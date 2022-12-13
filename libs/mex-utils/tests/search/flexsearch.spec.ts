import { beforeEach,expect, test } from 'vitest'

import { GenericSearchData } from '../../src/types/search'

import { createGenricSearchIndex } from './../../src/search/flexsearch'

beforeEach(async (context) => {
  const initList: GenericSearchData[] = [
    {
      id: '1',
      text: 'Hello World',
      title: 'First Entry'
    },
    {
      id: '2',
      text: "I'm Batman",
      title: 'Second Entry'
    }
  ]
  const idx = createGenricSearchIndex(initList, undefined)
  expect(idx).toBeTruthy()

  context.idx = idx
})

test('Create Index and Search - Valid Case 1', ({ idx }) => {
  const results: any[] = idx.search('Hello')
  expect(results.length).toBeGreaterThanOrEqual(1)
})

test('Create Index and Search - Valid Case 2', ({ idx }) => {
  const emptyResult: any[] = idx.search('Lassan')
  expect(emptyResult.length).toBe(0)
})
