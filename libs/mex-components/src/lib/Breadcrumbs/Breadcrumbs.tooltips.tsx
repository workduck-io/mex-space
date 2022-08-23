import { Icon } from '@iconify/react'
import Tippy from '@tippyjs/react/headless'

import { OverflowTooltipWrapper, SBreadcrumbOverflow } from './Breadcrumbs.style'

interface BreadcrumbOverflowProps {
  OverflowItems: () => JSX.Element
}

export const BreadcrumbOverflow = ({ OverflowItems }: BreadcrumbOverflowProps) => {
  // const [visible, setVisible] = useState(false)
  return (
    <Tippy
      interactive
      render={(attrs) => (
        <OverflowTooltipWrapper tabIndex={-1} {...attrs}>
          <OverflowItems />
        </OverflowTooltipWrapper>
      )}
    >
      <SBreadcrumbOverflow>
        <Icon icon="ri:more-fill" />
      </SBreadcrumbOverflow>
    </Tippy>
  )
}
