import { PlatePlugin } from '@udecode/plate-core';
import { COMET_QUICK_LINK } from '.';
import { getSlateClass } from '@udecode/plate';
import { ILinkElement } from './components/ILinkElement';

/**
 * Enables support for Internal links.
 */
export const createQuickLinkPlugin = (): PlatePlugin => ({
  key: COMET_QUICK_LINK,
  isElement: true,
  component: ILinkElement,
  deserializeHtml: {
    getNode: (el) => ({
      value: el.getAttribute('data-slate-value'),
    }),
    rules: [{ validClassName: getSlateClass(COMET_QUICK_LINK) }],
  },
  isInline: true,
  isVoid: true,
});
