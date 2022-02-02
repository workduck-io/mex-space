import { createPluginFactory, getSlateClass } from '@udecode/plate';
import { QuickLinkElement } from './components/QuickLinkElement';
import { COMET_QUICK_LINK } from '../../types/elements';

/**
 * Enables support for Internal links.
 */
export const createQuickLinkPlugin = createPluginFactory({
  key: COMET_QUICK_LINK,
  isElement: true,
  component: QuickLinkElement,
  deserializeHtml: {
    getNode: (el) => ({
      value: el.getAttribute('data-slate-value'),
    }),
    rules: [{ validClassName: getSlateClass(COMET_QUICK_LINK) }],
  },
  isInline: true,
  isVoid: true,
});
