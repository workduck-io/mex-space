import { css } from 'styled-components';
import { FocusModeProp } from '../types/FocusMode';
const FOCUS_MODE_OPACITY = 0.5;

export const focusStyles = ({
  focusMode,
  focusHover,
  overrideOpacity,
}: FocusModeProp) => {
  if (focusMode)
    return focusHover
      ? css`
          opacity: 1;
        `
      : css`
          opacity: ${overrideOpacity ?? FOCUS_MODE_OPACITY};
        `;
  return css``;
};
