import React, { useCallback, useEffect, useState } from 'react'

import { useTheme } from 'styled-components'

import { MexIcon } from '../Helpers/Layout'

import { AnimateZoom, FleetSection, FleetSectionTitle, FleetStyled, StyledModal } from './Fleet.style'
import { FleetProps } from './Fleet.types'

export const Fleet = ({ sections, isOpen, onClose, onOpen }: FleetProps) => {
  const theme = useTheme()
  const [active, setActive] = useState(0)

  const switchBetweeenSections = (backwards?: boolean) => {
    setActive((s) => {
      const newIndex = backwards ? (s - 1 + sections.length) % sections.length : (s + 1) % sections.length
      return newIndex
    })
  }

  const isShortcutPressed = (e: KeyboardEvent) => {
    const pressedModifier = !e.metaKey && !e.shiftKey && !e.ctrlKey && e.altKey
    return e.code === 'KeyN' && pressedModifier
  }

  const handleSwitchSections = (e: KeyboardEvent) => {
    const isKeyN = e.code === 'KeyN'
    const isArrowLeft = e.key === 'ArrowLeft'
    const isArrowRight = e.key === 'ArrowRight'

    const switchSection = isKeyN || isArrowLeft || isArrowRight
    const backwards = (e.shiftKey || isArrowLeft) && !isArrowRight

    if (switchSection) {
      switchBetweeenSections(backwards)
    }
  }

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.altKey) {
        if (!isOpen) {
          if (isShortcutPressed(event)) {
            event.preventDefault()
            onOpen()
          }
        } else {
          handleSwitchSections(event)
        }
      }
    },
    [isOpen]
  )

  const onKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Alt') {
        sections[active].onSelect()
        onClose()
        setActive(0)
      }
    },
    [active]
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    if (isOpen) window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [isOpen, onKeyUp, onKeyDown])

  return (
    <StyledModal
      shouldCloseOnEsc
      className="ModalContent"
      overlayClassName="ModalOverlay"
      onRequestClose={onClose}
      isOpen={isOpen}
    >
      <FleetStyled index={active} total={sections?.length}>
        {sections?.map((section, index) => {
          const isActive = active === index

          return (
            <FleetSection key={`Fleet-section-${section?.id}`} highlight={isActive}>
              <AnimateZoom selected={isActive}>
                <MexIcon
                  icon={section.icon}
                  width="40"
                  height="40"
                  color={isActive ? theme.colors.primary : theme.colors.text.default}
                />
              </AnimateZoom>
              <FleetSectionTitle>{section?.name}</FleetSectionTitle>
            </FleetSection>
          )
        })}
      </FleetStyled>
    </StyledModal>
  )
}
