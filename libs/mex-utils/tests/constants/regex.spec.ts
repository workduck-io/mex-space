import { expect, test } from 'vitest'

import { EMAIL_REG } from '../../src/constants/regex'

test('Email Regex - Valid Case 1', () => {
  const email = 'hello@workduck.io'
  expect<boolean>(EMAIL_REG.test(email)).toBe(true)
})

test('Email Regex - Valid Case 2', () => {
  const email = 'hello+14#@workduck.io'
  expect<boolean>(EMAIL_REG.test(email)).toBe(true)
})

test('Email Regex - Invalid Case 1', () => {
  const email = 'hello#workduck.io'
  expect<boolean>(EMAIL_REG.test(email)).toBe(false)
})

test('Email Regex - Invalid Case 2', () => {
  const email = 'email..email@example.com'
  expect<boolean>(EMAIL_REG.test(email)).toBe(false)
})
