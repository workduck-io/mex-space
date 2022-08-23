import { Icon } from '@iconify/react'
import Tippy from '@tippyjs/react'
import { debounce } from 'lodash'
import { useEffect, useRef, useState } from 'react'

import { useIntersectionContainer } from '../hooks/useContainerResize'
import {
  BreadcrumbSeparator,
  BreadcrumbSection,
  BreadcrumbWrapper,
  BreadcrumbLabel,
  BreadcrumbItem,
  BreadcrumbOverflowList
} from './Breadcrumbs.style'
import { BreadcrumbOverflow } from './Breadcrumbs.tooltips'
import { BreadcrumbProps } from './Breadcrumbs.types'

interface BreadcrumbState {
  collapsed: string[]
  visible: string[]
  currentVisible?: string
}

export const Breadcrumbs = ({ items, onOpenItem, interactiveFirstItem }: BreadcrumbProps) => {
  const wrapperRef = useRef(null)
  const { visibilityMap } = useIntersectionContainer(wrapperRef)

  const [state, setState] = useState<BreadcrumbState>({
    collapsed: [],
    // Initially all items are visible
    visible: items.map((i) => i.id),
    currentVisible: items.length > 0 ? items[items.length - 1].id : undefined
  })

  /**
   * Recalculate the layout of the items.
   * The visibility map is the state of what's currently visible
   * Once the intersection starts, the item is marked invisible,
   * and remains so unless fully in viewport
   */
  const recalculate = (visibilityMap: Record<string, boolean>, state: BreadcrumbState) => {
    // console.log('Recalculating')
    const { currentVisible, visible, collapsed } = state
    if (currentVisible && visibilityMap[currentVisible] === false && visible.length > 0) {
      const nextHideId = visible[0]
      const nextHide = items.find((i) => i.id === nextHideId)
      if (nextHide) {
        const newCollapsed = [nextHide.id, ...collapsed]
        const newVisible = [...visible].slice(1)

        setState({
          collapsed: newCollapsed,
          visible: newVisible,
          currentVisible
        })
        return
      }
    }

    // Make the items that are in container visible in the list
    // Need to map as all the items may not be visible at once
    const newState = collapsed.reduce(
      (val, collapsedItem) => {
        if (collapsedItem && visibilityMap[collapsedItem]) {
          // console.log('Now is the time to show', { currentVisible, visible, collapsedItem, collapsed })
          const newCollapsed = [...val.collapsed.filter((i) => i !== collapsedItem)]
          const newVisible = [collapsedItem, ...val.visible]
          return {
            collapsed: newCollapsed,
            visible: newVisible,
            changed: true
          }
        } else return val
      },
      {
        collapsed: [...collapsed],
        visible: [...visible],
        // Track if we need to change state
        changed: false
      }
    )
    if (newState.changed) {
      setState({
        collapsed: newState.collapsed,
        visible: newState.visible,
        currentVisible: currentVisible
      })
    }
  }

  const debouncedRecal = debounce(recalculate, 200, { leading: true })

  useEffect(() => {
    // Once the visibilityMap changes we recalculate
    debouncedRecal(visibilityMap, state)
  }, [visibilityMap])

  const { collapsed } = state

  return (
    <BreadcrumbWrapper ref={wrapperRef}>
      {collapsed.length > 0 && (
        <>
          <BreadcrumbOverflow
            OverflowItems={() => (
              <BreadcrumbOverflowList>
                {collapsed.map((id) => {
                  const item = items.find((i) => i.id === id)
                  if (item)
                    return (
                      <Tippy
                        theme="mex-bright"
                        moveTransition="transform 0.25s ease-out"
                        placement="right"
                        content={item.label}
                      >
                        <BreadcrumbItem onClick={() => onOpenItem(item.id)}>
                          {item.icon && <Icon icon={item.icon} />}
                          <BreadcrumbLabel>{item.label}</BreadcrumbLabel>
                        </BreadcrumbItem>
                      </Tippy>
                    )
                  else return null
                })}
              </BreadcrumbOverflowList>
            )}
          />
          <BreadcrumbSeparator>
            <Icon icon="ri:arrow-drop-right-line" />
          </BreadcrumbSeparator>
        </>
      )}
      {items.map((item, index) => {
        const collapsedIndex = collapsed.findIndex((i) => i === item.id) ?? -1
        return (
          <BreadcrumbSection
            data-targetid={item.id /* Set so that the observer only watches these elements */}
            key={`breadcrumb_item_${item.id}`}
            collapsedIndex={collapsedIndex}
          >
            <Tippy theme="mex-bright" moveTransition="transform 0.25s ease-out" placement="bottom" content={item.label}>
              <BreadcrumbItem
                interactive={!!interactiveFirstItem || index !== items.length - 1}
                onClick={() => onOpenItem(item.id)}
              >
                {item.icon && <Icon icon={item.icon} />}
                <BreadcrumbLabel>{item.label}</BreadcrumbLabel>
              </BreadcrumbItem>
            </Tippy>
            {index !== items.length - 1 && (
              <BreadcrumbSeparator key={`breadcrumb_separator_${item.id}`}>
                <Icon icon="ri:arrow-drop-right-line" />
              </BreadcrumbSeparator>
            )}
          </BreadcrumbSection>
        )
      })}
    </BreadcrumbWrapper>
  )
}
