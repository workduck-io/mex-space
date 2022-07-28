import { ELEMENT_DEFAULT } from '../../src'

describe('Editor Elements Check', () => {
  describe('Default Element Type Check ', () => {
    it('return p since ELEMENT_DEFAULT is always `p`', () => {
      expect(ELEMENT_DEFAULT).toEqual('p')
    })
  })
})
