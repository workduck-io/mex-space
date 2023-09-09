import { Document } from '@workduck-io/flexsearch'
import { NodeEditorContent, NodeMetadata, SearchRepExtra } from '@workduck-io/mex-utils/src'

import { DEFAULT_SYSTEM_TAGS } from '../constants'
import { GenericEntitySearchData } from '../parsers/types'
import { Entities, Indexes } from '../utils'

export type IUpdateDoc = {
  id: string
  contents: NodeEditorContent
  title?: string
  options?: {
    extra?: SearchRepExtra
    metadata?: NodeMetadata
    tags?: string[]
    systemTags?: DEFAULT_SYSTEM_TAGS[]
  }
  indexKey?: Indexes
}

export type IndexMap = {
  [key in Indexes]: Document<GenericEntitySearchData, string[]>
}

export type UpdateDocFn = (doc: IUpdateDoc) => void

export type SimpleQueryType = 'tag' | 'mention' | 'heirarchy' | 'text' | 'origin'
export type NestedQueryType = 'query'

export enum Operation {
  EQUAL = 'EQ'
}

export type Expression = {
  field: string
  value: string
  op: Operation
}

export interface PropertyQueryUnit {
  type: string
  propertyExpr?: Expression[]
  unionOperator?: 'and' | 'or'
}

export interface ISimpleQueryUnit {
  nextOperator?: 'and' | 'or'
  type: SimpleQueryType
  value: string
  entities?: PropertyQueryUnit[]
  contains?: Entities[]
}

export interface IQueryUnit {
  nextOperator?: 'and' | 'or'
  type: NestedQueryType
  query: ISearchQuery
  entities?: PropertyQueryUnit[]
  contains?: Entities[]
}

export type QueryUnit = ISimpleQueryUnit | IQueryUnit

export type ISearchQuery = QueryUnit[]

export interface SearchResult {
  id: string
  data: { [key: string]: any }
  entity: Entities
  tags: string[]
  text: string
  parent?: string
}

export interface HighlightMetaBlock {
  parentTagName: string
  parentIndex: number
  textOffset: number
}

export interface SaveableRange {
  startMeta: HighlightMetaBlock
  endMeta: HighlightMetaBlock
  text: string
  id: string
}

export interface Highlight {
  /**
   * ID of the highlight
   */
  entityId: string

  /**
   * Properties of the highlight
   */
  properties: {
    /**
     * Range of the highlighted content in page
     */
    saveableRange: SaveableRange
    /**
     * Source URL of the webpage on which the highlight was made
     */
    sourceUrl: string
  }

  /**
   * ID of the note where the content was added
   */
  nodeId?: string
}

export interface Link {
  url: string

  // Useful for having preview image and other metatags for the shortened link
  title: string
  description?: string
  imgSrc?: string

  /**
   * If the link is shortend it has an alias
   */
  alias?: string
  tags?: string[]

  createdAt?: number
  updatedAt?: number
}

export enum PriorityType {
  low = 'low',
  high = 'high',
  medium = 'medium',
  noPriority = 'noPriority'
}

type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

interface WeeklyFrequency {
  type: 'weekly'
  week: [
    {
      day: Weekday
      freq: RepeatFrequency | OnceFrequency
    }
  ]
}

interface RepeatFrequency {
  type: 'repeat'
  /*
   * The times at which the event should occur.
   * All times in the array must be of the same day.
   */
  startTime: number
  endTime: number
  interval: number
  skip?: number
}

interface OnceFrequency {
  type: 'once'
  time: number
}

export type ReminderFrequency = OnceFrequency | RepeatFrequency | WeeklyFrequency
// Which action has been taken

export interface ReminderState {
  // Has been armed
  // If notification was not armed and time elapsed,
  // Arm it if it is within the same day
  // Show missed notifications in all notifications
  snooze: boolean
  done: boolean
}

export type ReminderAssociatedType = 'node' | 'todo' | 'url'

export interface Reminder {
  id: string
  title: string
  description?: string

  // Associated
  // What is the reminder for
  associated: ReminderAssociatedType

  // Id of the associated entity
  nodeid?: string
  todoid?: string
  url?: string

  // If snooze is set, then snooze time is used
  time: number

  // Which action has been taken
  state: ReminderState

  // Notification metadata
  createdAt: number
  updatedAt: number

  // Frequency, if present is used instead of time
  // TODO: Combine with time
  frequency?: ReminderFrequency
  priority?: PriorityType
}
