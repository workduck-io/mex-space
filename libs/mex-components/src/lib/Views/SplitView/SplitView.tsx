import React, { useMemo } from 'react'
import { useSpring } from 'react-spring'

import { SplitPreviewWrapper, SplitWrapper } from './SplitView.style'
import { RenderSplitProps, SplitOptions, SplitType } from './SplitView.types'

export interface SplitViewProps {
  id: string
  children: React.ReactNode
  splitOptions: SplitOptions
  /**
   * Component to render Preview
   * Recieves the splitOptions as props
   */
  RenderSplitPreview: (props: RenderSplitProps) => JSX.Element
}

const DEFAULT_SPLIT_PERCENTAGE = 40

/**
 * SplitView
 *
 * Add flex-grow:1 to the children container for it to expand to fill the remainder space
 * The preview wrapper extends to the width specified in the splitOptions.percent prop
 */
const SplitView = ({ RenderSplitPreview, children, splitOptions, id }: SplitViewProps) => {
  // mog('Split View', { splitOptions, id })
  const springProps = useMemo(() => {
    const style = { width: '0%' }

    if (splitOptions.type === SplitType.FULL) {
      style.width = '100%'
    } else if (splitOptions.type === SplitType.SIDE) {
      style.width = `${splitOptions.percent ?? DEFAULT_SPLIT_PERCENTAGE}%`
    } else if (splitOptions.type === SplitType.NONE) {
      style.width = '0%'
    }

    return style
  }, [splitOptions])

  const animationProps = useSpring(springProps)

  return (
    <SplitWrapper id={`SplitWrapperFor_${id}`}>
      {splitOptions.type !== SplitType.FULL && children}
      {splitOptions.type !== SplitType.NONE && (
        <SplitPreviewWrapper id={`SplitPreviewWrapperFor_${id}`} style={animationProps}>
          <RenderSplitPreview splitOptions={splitOptions} />
        </SplitPreviewWrapper>
      )}
    </SplitWrapper>
  )
}

export default SplitView
