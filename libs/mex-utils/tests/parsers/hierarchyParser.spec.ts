import { expect, test } from 'vitest'

import {
  allNamespacesHierarchyParser,
  hierarchyParser,
  namespaceHierarchyParser
} from '../../src/parsers/hierarchyParser'

test('Hierarchy Parser - Valid Case', () => {
  const hierarchy = [
    'Entities Testing#NODE_r3wd6CP9rqDTypPqjzBck',
    'lassan#NODE_FHPR9T7rAkixbGrUkFt7R#Untitled#NODE_gpTpmCdDBJLMbtEwN38pr',
    'Meeti#NODE_K6b3TqJwfRT8VpeAMgtG6',
    'Drafts#NODE_TtdLUWMJEPJGJRY6PzKcA#A war crime is a#NODE_bjnqNrX6GUB6G9Nmbfrt8',
    'Drafts#NODE_TtdLUWMJEPJGJRY6PzKcA#Untitled#NODE_LgagK7tEFYNReNF3RiD9d',
    'Mex#NODE_3qtx4AdKtW9TqVg6QtKjf#Entity Search#NODE_jKMqciMtxfQrmhAfxVhzy'
  ]

  const parsedHierarchy = hierarchyParser(hierarchy)
  expect(parsedHierarchy).toStrictEqual([
    { nodeid: 'NODE_r3wd6CP9rqDTypPqjzBck', path: 'Entities Testing' },
    { nodeid: 'NODE_FHPR9T7rAkixbGrUkFt7R', path: 'lassan' },
    { nodeid: 'NODE_gpTpmCdDBJLMbtEwN38pr', path: 'lassan.Untitled' },
    { nodeid: 'NODE_K6b3TqJwfRT8VpeAMgtG6', path: 'Meeti' },
    { nodeid: 'NODE_TtdLUWMJEPJGJRY6PzKcA', path: 'Drafts' },
    { nodeid: 'NODE_bjnqNrX6GUB6G9Nmbfrt8', path: 'Drafts.A war crime is a' },
    { nodeid: 'NODE_LgagK7tEFYNReNF3RiD9d', path: 'Drafts.Untitled' },
    { nodeid: 'NODE_3qtx4AdKtW9TqVg6QtKjf', path: 'Mex' },
    { nodeid: 'NODE_jKMqciMtxfQrmhAfxVhzy', path: 'Mex.Entity Search' }
  ])
})

test('Hierarchy Parser - Fail Case', () => {
  const fuckedUpHierarchy = [
    'Entities Testing#NODE_r3wd6CP9rqDTypPqjzBck',
    'lassan#NODE_FHPR9T7rAkixbGrUkFt7R#Untitled#NODE_gpTpmCdDBJLMbtEwN38pr',
    'Meeti#NODE_K6b3TqJwfRT8VpeAMgtG6',
    'Drafts#NODE_TtdLUWMJEPJGJRY6PzKcA#A war crime is a#NODE_bjnqNrX6GUB6G9Nmbfrt8',
    'Drafts#NODE_TtdLUWMJEPJGJRY6PzKcA#Untitled#NODE_LgagK7tEFYNReNF3RiD9d',
    'Mex#Entity Search#NODE_jKMqciMtxfQrmhAfxVhzy'
  ]

  expect(() => hierarchyParser(fuckedUpHierarchy)).toThrowError('Invalid Linkdata Input')
})

test('Single Namespace Hierarchy - Valid Case', () => {
  const response = {
    id: 'NAMESPACE_Li83KJzGw6TgUmTi43LGt',
    name: 'Personal',
    createdAt: 1662555454584,
    updatedAt: 1662555454584,
    itemType: 'Namespace',
    nodeHierarchy: [
      'Entities Testing#NODE_r3wd6CP9rqDTypPqjzBck',
      'lassan#NODE_FHPR9T7rAkixbGrUkFt7R#Untitled#NODE_gpTpmCdDBJLMbtEwN38pr',
      'Meeti#NODE_K6b3TqJwfRT8VpeAMgtG6',
      'Drafts#NODE_TtdLUWMJEPJGJRY6PzKcA#A war crime is a#NODE_bjnqNrX6GUB6G9Nmbfrt8',
      'Drafts#NODE_TtdLUWMJEPJGJRY6PzKcA#Untitled#NODE_LgagK7tEFYNReNF3RiD9d',
      'Mex#NODE_3qtx4AdKtW9TqVg6QtKjf#Entity Search#NODE_jKMqciMtxfQrmhAfxVhzy'
    ],
    publicAccess: false
  }

  const parsed = namespaceHierarchyParser(response)
  expect(parsed.nodeHierarchy).toStrictEqual([
    { nodeid: 'NODE_r3wd6CP9rqDTypPqjzBck', path: 'Entities Testing' },
    { nodeid: 'NODE_FHPR9T7rAkixbGrUkFt7R', path: 'lassan' },
    { nodeid: 'NODE_gpTpmCdDBJLMbtEwN38pr', path: 'lassan.Untitled' },
    { nodeid: 'NODE_K6b3TqJwfRT8VpeAMgtG6', path: 'Meeti' },
    { nodeid: 'NODE_TtdLUWMJEPJGJRY6PzKcA', path: 'Drafts' },
    {
      nodeid: 'NODE_bjnqNrX6GUB6G9Nmbfrt8',
      path: 'Drafts.A war crime is a'
    },
    { nodeid: 'NODE_LgagK7tEFYNReNF3RiD9d', path: 'Drafts.Untitled' },
    { nodeid: 'NODE_3qtx4AdKtW9TqVg6QtKjf', path: 'Mex' },
    { nodeid: 'NODE_jKMqciMtxfQrmhAfxVhzy', path: 'Mex.Entity Search' }
  ])
  expect(parsed).toBeTruthy()
})

test('Namespace Hierarchy Parser - Valid Case 1', () => {
  const nsHierarchyResponse = {
    namespaceInfo: {
      NAMESPACE_Li83KJzGw6TgUmTi43LGt: {
        name: 'Personal',
        nodeHierarchy: [
          'Entities Testing#NODE_r3wd6CP9rqDTypPqjzBck',
          'lassan#NODE_FHPR9T7rAkixbGrUkFt7R#Untitled#NODE_gpTpmCdDBJLMbtEwN38pr',
          'Meeti#NODE_K6b3TqJwfRT8VpeAMgtG6',
          'Drafts#NODE_TtdLUWMJEPJGJRY6PzKcA#A war crime is a#NODE_bjnqNrX6GUB6G9Nmbfrt8',
          'Drafts#NODE_TtdLUWMJEPJGJRY6PzKcA#Untitled#NODE_LgagK7tEFYNReNF3RiD9d',
          'Mex#NODE_3qtx4AdKtW9TqVg6QtKjf#Entity Search#NODE_jKMqciMtxfQrmhAfxVhzy'
        ]
      },
      NAMESPACE_Li83KJzGw6TgUmt8dfkd8: {
        name: 'Another Namespace',
        nodeHierarchy: [
          'Drafts#NODE_6pejwQT4HxTFeQj7yt9CY#Critical error 1#NODE_afE9DUhQKmVBAPEPXxa7G',
          'Drafts#NODE_6pejwQT4HxTFeQj7yt9CY#Nice thing new#NODE_mAQxQVbnNRKVJKfYtzRdK#This is it#NODE_bkxPUpJ7fdFpQYMezggDN',
          'Drafts#NODE_6pejwQT4HxTFeQj7yt9CY#Nice thing new#NODE_mAQxQVbnNRKVJKfYtzRdK#Untitled#NODE_KrYVbCFjrmTnUBGzE3H7C',
          'Onboarding#NODE_RDjiJXzj96zDPxwVVD6xm#The yes flag has been#NODE_ccVjThtMCXh7TUydMrVQA#Untitled gaping kiss template#NODE_V4fyYdz7FGAf9JptnmpET',
          'Onboarding#NODE_RDjiJXzj96zDPxwVVD6xm#New Bug#NODE_tggCDzJ3QjzjJmwTcz3B4',
          'Onboarding#NODE_RDjiJXzj96zDPxwVVD6xm#My first note#NODE_idfnci9aMkrGgFkahRBEV#PR Links#NODE_J88aVG9QLfPMxUQxPEzq6',
          'Onboarding#NODE_RDjiJXzj96zDPxwVVD6xm#Something nice is happening#NODE_6HY8FcTrqmQGXk9EwaBhY',
          'Onboarding#NODE_RDjiJXzj96zDPxwVVD6xm#Assigned to Feature#NODE_nKNhenAQwmE3KLkBBLE8P',
          'Onboarding#NODE_RDjiJXzj96zDPxwVVD6xm#My first note#NODE_idfnci9aMkrGgFkahRBEV#new#NODE_pBFe6mUE36CCr3DFJ9DX3',
          'Onboarding#NODE_RDjiJXzj96zDPxwVVD6xm#Who is this#NODE_FermrDLWWPJLryyqAAxJq',
          'Onboarding#NODE_RDjiJXzj96zDPxwVVD6xm#Untitled#NODE_nKNhenAQwmE3KLkBBLE8P',
          'Onboarding#NODE_RDjiJXzj96zDPxwVVD6xm#Assigned to Feature associated Describe#NODE_Y8zBYexzLzH7Rt6J6BxUw',
          'Onboarding#NODE_RDjiJXzj96zDPxwVVD6xm#Experiments are the key to#NODE_9wX6QYRHFgJzzBeEXEJJm',
          'Onboarding#NODE_RDjiJXzj96zDPxwVVD6xm#My first note#NODE_idfnci9aMkrGgFkahRBEV#Henlo fren#NODE_AzeL7ty37B66UKDxR4EQL',
          'Onboarding#NODE_RDjiJXzj96zDPxwVVD6xm#My first note#NODE_idfnci9aMkrGgFkahRBEV#Who is the new thing#NODE_XqBMNVpmL3YbWmNqVr47z',
          'Onboarding#NODE_RDjiJXzj96zDPxwVVD6xm#My first note#NODE_idfnci9aMkrGgFkahRBEV#Henlo#NODE_aH7tDPcQAPq7zXAh4WjER',
          'Onboarding#NODE_RDjiJXzj96zDPxwVVD6xm#My first note#NODE_idfnci9aMkrGgFkahRBEV#Can this please work#NODE_rGagCBd3QJnHqq7Txt7Uc',
          'Onboarding#NODE_RDjiJXzj96zDPxwVVD6xm#Om mangalam#NODE_DzimLJ7H9WTi6rgcFMEaB',
          'Drafts#NODE_6pejwQT4HxTFeQj7yt9CY#Untitled-1#NODE_e8zHGcTBHejB3EQND6jCW',
          'Onboarding#NODE_RDjiJXzj96zDPxwVVD6xm#My first note#NODE_idfnci9aMkrGgFkahRBEV#Hello there boy#NODE_C3V6WDpLrfdFbDPXrbBtm',
          'Onboarding#NODE_RDjiJXzj96zDPxwVVD6xm#My first note#NODE_idfnci9aMkrGgFkahRBEV#Uncaught Exception Error ENOENT no#NODE_iFNqipU8A4MazYTKPKk4y'
        ]
      }
    }
  }

  const parsedHierarchy = allNamespacesHierarchyParser(nsHierarchyResponse)
  const expectedParsedHierarchy = {
    NAMESPACE_Li83KJzGw6TgUmTi43LGt: {
      name: 'Personal',
      nodeHierarchy: [
        { nodeid: 'NODE_r3wd6CP9rqDTypPqjzBck', path: 'Entities Testing' },
        { nodeid: 'NODE_FHPR9T7rAkixbGrUkFt7R', path: 'lassan' },
        { nodeid: 'NODE_gpTpmCdDBJLMbtEwN38pr', path: 'lassan.Untitled' },
        { nodeid: 'NODE_K6b3TqJwfRT8VpeAMgtG6', path: 'Meeti' },
        { nodeid: 'NODE_TtdLUWMJEPJGJRY6PzKcA', path: 'Drafts' },
        { nodeid: 'NODE_bjnqNrX6GUB6G9Nmbfrt8', path: 'Drafts.A war crime is a' },
        { nodeid: 'NODE_LgagK7tEFYNReNF3RiD9d', path: 'Drafts.Untitled' },
        { nodeid: 'NODE_3qtx4AdKtW9TqVg6QtKjf', path: 'Mex' },
        { nodeid: 'NODE_jKMqciMtxfQrmhAfxVhzy', path: 'Mex.Entity Search' }
      ]
    },
    NAMESPACE_Li83KJzGw6TgUmt8dfkd8: {
      name: 'Another Namespace',
      nodeHierarchy: [
        { nodeid: 'NODE_6pejwQT4HxTFeQj7yt9CY', path: 'Drafts' },
        { nodeid: 'NODE_afE9DUhQKmVBAPEPXxa7G', path: 'Drafts.Critical error 1' },
        { nodeid: 'NODE_mAQxQVbnNRKVJKfYtzRdK', path: 'Drafts.Nice thing new' },
        { nodeid: 'NODE_bkxPUpJ7fdFpQYMezggDN', path: 'Drafts.Nice thing new.This is it' },
        { nodeid: 'NODE_KrYVbCFjrmTnUBGzE3H7C', path: 'Drafts.Nice thing new.Untitled' },
        { nodeid: 'NODE_RDjiJXzj96zDPxwVVD6xm', path: 'Onboarding' },
        { nodeid: 'NODE_ccVjThtMCXh7TUydMrVQA', path: 'Onboarding.The yes flag has been' },
        {
          nodeid: 'NODE_V4fyYdz7FGAf9JptnmpET',
          path: 'Onboarding.The yes flag has been.Untitled gaping kiss template'
        },
        { nodeid: 'NODE_tggCDzJ3QjzjJmwTcz3B4', path: 'Onboarding.New Bug' },
        { nodeid: 'NODE_idfnci9aMkrGgFkahRBEV', path: 'Onboarding.My first note' },
        { nodeid: 'NODE_J88aVG9QLfPMxUQxPEzq6', path: 'Onboarding.My first note.PR Links' },
        { nodeid: 'NODE_6HY8FcTrqmQGXk9EwaBhY', path: 'Onboarding.Something nice is happening' },
        { nodeid: 'NODE_nKNhenAQwmE3KLkBBLE8P', path: 'Onboarding.Untitled' },
        { nodeid: 'NODE_pBFe6mUE36CCr3DFJ9DX3', path: 'Onboarding.My first note.new' },
        { nodeid: 'NODE_FermrDLWWPJLryyqAAxJq', path: 'Onboarding.Who is this' },
        { nodeid: 'NODE_Y8zBYexzLzH7Rt6J6BxUw', path: 'Onboarding.Assigned to Feature associated Describe' },
        { nodeid: 'NODE_9wX6QYRHFgJzzBeEXEJJm', path: 'Onboarding.Experiments are the key to' },
        { nodeid: 'NODE_AzeL7ty37B66UKDxR4EQL', path: 'Onboarding.My first note.Henlo fren' },
        { nodeid: 'NODE_XqBMNVpmL3YbWmNqVr47z', path: 'Onboarding.My first note.Who is the new thing' },
        { nodeid: 'NODE_aH7tDPcQAPq7zXAh4WjER', path: 'Onboarding.My first note.Henlo' },
        { nodeid: 'NODE_rGagCBd3QJnHqq7Txt7Uc', path: 'Onboarding.My first note.Can this please work' },
        { nodeid: 'NODE_DzimLJ7H9WTi6rgcFMEaB', path: 'Onboarding.Om mangalam' },
        { nodeid: 'NODE_e8zHGcTBHejB3EQND6jCW', path: 'Drafts.Untitled-1' },
        { nodeid: 'NODE_C3V6WDpLrfdFbDPXrbBtm', path: 'Onboarding.My first note.Hello there boy' },
        { nodeid: 'NODE_iFNqipU8A4MazYTKPKk4y', path: 'Onboarding.My first note.Uncaught Exception Error ENOENT no' }
      ]
    }
  }

  expect(JSON.stringify(parsedHierarchy)).toBe(JSON.stringify(expectedParsedHierarchy))
})
