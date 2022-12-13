import { getSplitDisplayShortcut } from './helpers'
import { ShortcutBox, ShortcutMid, ShortcutWrapper, TooltipShortcut } from './Shortcuts.style'

export interface DisplayShortcutProps {
  shortcut: string
}

export const DisplayShortcut = ({ shortcut }: DisplayShortcutProps) => {
  const keys = getSplitDisplayShortcut(shortcut)

  return (
    <ShortcutWrapper>
      {keys.map((k, i) => (
        <ShortcutWrapper key={k}>
          <ShortcutBox>{k}</ShortcutBox>
          {i !== keys.length - 1 && <ShortcutMid>+</ShortcutMid>}
        </ShortcutWrapper>
      ))}
    </ShortcutWrapper>
  )
}

export interface TitleWithShortcutProps {
  title: string
  shortcut?: string
}

export const TitleWithShortcut = ({ title, shortcut }: TitleWithShortcutProps) => {
  return (
    <TooltipShortcut>
      {title}
      {shortcut && <DisplayShortcut shortcut={shortcut} />}
    </TooltipShortcut>
  )
}
