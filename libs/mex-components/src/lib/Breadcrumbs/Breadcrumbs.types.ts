export interface BreadcrumbItem {
  // Unique id of the item
  id: string
  // Label to show on the item
  label: string
  // Icon string for rendering icon with the item (if any)
  icon?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  onOpenItem: (id: string) => void
}
