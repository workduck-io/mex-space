import { Entities } from '../utils'

export interface FilterQuery {
  query?: FilterQuery
  operator?: 'and' | 'or'
  tag?: string[]
  mention?: string[]
  heirarchy?: string[]
}

export interface SearchQuery {
  text: string
  entityTypes?: Entities[]
}
