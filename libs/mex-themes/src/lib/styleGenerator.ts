import { css } from 'styled-components'

import { BaseElementStyle, CssVariable, ElementStyle } from './types/theme-new'

export const generateStyleBase = (bes: BaseElementStyle<CssVariable>) => {
  const { surface, text, iconColor, border } = bes
  const style = {
    backgroundColor: surface,
    color: text?.color,
    border: border
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

export const generateStyleGeneric = (ges: ElementStyle<CssVariable>) => {
  const { surface, text, iconColor, border, hover, active, disabled } = ges
  const base = { surface, text, iconColor, border }

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
