export type FleetSectionType = {
  id: number
  name: string
  color?: string
  icon: string
  onSelect: () => void
}

export type FleetProps = {
  sections: Array<FleetSectionType>
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}
