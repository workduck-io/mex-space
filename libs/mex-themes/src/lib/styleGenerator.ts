import { css } from 'styled-components'

import { BaseElementStyle, ElementStyle } from './types/theme'

export const generateStyleBase = <T>(bes: BaseElementStyle<T>) => {
  const { surface, textColor, iconColor, border, borderLeft } = bes
  const style = {
    backgroundColor: surface,
    color: textColor,
    border: border,
    borderLeft: borderLeft
  }

  if (iconColor) {
    style['&>iconify-icon'] = {
      color: iconColor
    }
    style['&>svg'] = {
      color: iconColor
    }
  }

  return style
}

export const generateStyle = <T>(ges: ElementStyle<T>) => {
  const { surface, textColor, iconColor, border, hover, active, disabled } = ges
  const base = { surface, textColor, iconColor, border }

  const style = {
    ...generateStyleBase(base),
    '&:hover': hover ? generateStyleBase(hover) : {},
    '&:active': active ? generateStyleBase(active) : {},
    '&:disabled': disabled ? generateStyleBase(disabled) : {}
  }
  return style
}

export const cssStyle = (style: any) => {
  return css`
    ${style}
  `
}
