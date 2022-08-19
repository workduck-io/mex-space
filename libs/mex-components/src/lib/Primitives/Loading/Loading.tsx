import React from 'react'

import { LoadingDot, LoadingWrapper } from './Loading.style'
import { LoadingProps } from './Loading.types'

const Loading = ({ dots, transparent, color, size, orientation, direction }: LoadingProps) => {
  return (
    <LoadingWrapper transparent={transparent} orientation={orientation ?? 'horizontal'} dots={dots}>
      {Array(dots)
        .fill(0)
        .map((e, i) => (
          <LoadingDot
            direction={direction ?? 'forward'}
            color={color}
            size={size}
            totalDots={dots}
            key={`loadingDot${i}`}
          ></LoadingDot>
        ))}
    </LoadingWrapper>
  )
}

export default Loading
