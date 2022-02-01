import { PlatePlugin } from '@udecode/plate-core';
import { COMET_QUICK_LINK } from '.';
import { getSlateClass } from '@udecode/plate';

/**
 * Enables support for Internal links.
 */
export const createILinkPlugin = (): PlatePlugin => ({
  key: COMET_QUICK_LINK,
  isElement: true,
  deserializeHtml: {
    getNode: (el) => ({
      value: el.getAttribute('data-slate-value'),
    }),
    rules: [{ validClassName: getSlateClass(COMET_QUICK_LINK) }],
  },
  isInline: true,
  isVoid: true,
});
