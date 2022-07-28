import { EMAIL_REG } from '../../src'

describe('Auth Regex Check', () => {
  describe('Email Regex - Valid Case 1 ', () => {
    it('return true since hello@workduck.io is a valid email', () => {
      const email = 'hello@workduck.io'
      expect<boolean>(EMAIL_REG.test(email)).toBe(true)
    })
  })
  describe('Email Regex - Valid Case 2 ', () => {
    it('return true since hello@workduck.io is a valid email', () => {
      const email = 'hello+14#@workduck.io'
      expect<boolean>(EMAIL_REG.test(email)).toBe(true)
    })
  })
})
