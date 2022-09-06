export interface BreadcrumbItem {
  // Unique id of the item
  id: string
  // Label to show on the item
  label: string
  // Icon string for rendering icon with the item (if any)
  icon?: string

  // Hide label for this item?
  hideLabel?: boolean
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  onOpenItem: (id: string) => void

  /**
   * If true, the first item is interactive as well
   * Default: false
   */
  interactiveFirstItem?: boolean
}
