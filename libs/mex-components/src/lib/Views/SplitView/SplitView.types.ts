export enum SplitType {
  // Preview takes the full width of the screen
  FULL = 'FULL',
  // Preview takes the specified percentage width of the screen
  SIDE = 'SIDE',
  // Preview is hidden
  NONE = 'NONE'
}

export interface SplitOptions {
  type: SplitType

  /** percentage for preview
   * Default: 40
   */
  percent?: number
}

export interface RenderSplitProps {
  splitOptions: SplitOptions
}
