import { Fleet } from '@workduck-io/mex-components'
import { useState } from 'react'

const FleetContainer = () => {
  const [isOpen, setIsOpen] = useState(false)

  const sections = [{
    id: 0,
    name: 'New Note',
    icon: 'ri:list-file-2-line',
    onSelect: () => console.log("New Note created!")
  },
  {
    id: 1,
    name: 'New Space',
    icon: 'ri:list-file-2-line',
    onSelect: () => console.log("New Space created!")
  }]

  return <Fleet sections={sections} isOpen={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)} />
}

export default FleetContainer
