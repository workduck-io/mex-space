import {
  createAutoformatPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createExitBreakPlugin,
  createHeadingPlugin,
  createDndPlugin,
  createHighlightPlugin,
  createImagePlugin,
  createItalicPlugin,
  createLinkPlugin,
  createListPlugin,
  createTodoListPlugin,
  createMediaEmbedPlugin,
  createNodeIdPlugin,
  createParagraphPlugin,
  createResetNodePlugin,
  createSelectOnBackspacePlugin,
  createSoftBreakPlugin,
  createStrikethroughPlugin,
  createTablePlugin,
  createUnderlinePlugin,
  PlatePlugin,
  autoformatArrow,
  autoformatLegal,
  autoformatLegalHtml,
  autoformatMath,
  autoformatPunctuation,
  autoformatSmartQuotes,
  ELEMENT_HR,
  createHorizontalRulePlugin,
  setNodes,
  createAlignPlugin,
  ELEMENT_DEFAULT,
  insertNodes,
  createPlugins,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  createPlateUI,
  ELEMENT_PARAGRAPH,
} from '@udecode/plate';

// import { withStyledDraggables } from './lib/wrappers/withDraggable';
// import { withStyledPlaceHolders } from '../../../../../../lib/wrappers/withPlaceholder';
// import components from '../../../../../../lib/components/components';

import {
  createExcalidrawPlugin,
  ELEMENT_EXCALIDRAW,
} from '@udecode/plate-excalidraw';
// import { ExcalidrawElement } from '../../../../../../lib/components/Excalidraw';

// import { createILinkPlugin } from '../../../../../../lib/components/ilink/createILinkPlugin';
// import { createInlineBlockPlugin } from '../../../../../../lib/components/InlineBlock/createInlineBlockPlugin';
// import { createSyncBlockPlugin } from '../../../../../../lib/components/SyncBlock/createSyncBlockPlugin';
// import { createTagPlugin } from '../../../../../../lib/components/tag/createTagPlugin';
// import { createBlurSelectionPlugin } from '../../../../../../lib/plugins/blurSelection';
import {
  optionsAutoFormatRule,
  optionsCreateNodeIdPlugin,
  optionsExitBreakPlugin,
  optionsResetBlockTypePlugin,
  optionsSelectOnBackspacePlugin,
  optionsSoftBreakPlugin,
} from './options';
// import TableWrapper from '../components/TableWrapper';

export const generatePlugins = () => {
  const Plugins: PlatePlugin[] = [
    // editor

    // elements
    createParagraphPlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createHeadingPlugin(),

    // Marks
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createCodePlugin(),
    createHighlightPlugin(),
    createTodoListPlugin(),

    // Special Elements
    createImagePlugin(),
    createLinkPlugin(),
    createListPlugin(),
    // createTablePlugin({ component: TableWrapper }), // Table

    // Editing Plugins
    createSoftBreakPlugin(optionsSoftBreakPlugin),
    createExitBreakPlugin(optionsExitBreakPlugin),
    createResetNodePlugin(optionsResetBlockTypePlugin),
    createHorizontalRulePlugin(),
    createSelectOnBackspacePlugin({
      options: { query: { allow: [ELEMENT_HR, ELEMENT_EXCALIDRAW] } },
    }),
    createAlignPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
            ELEMENT_H4,
            ELEMENT_H5,
            ELEMENT_H6,
          ],
        },
      },
    }),

    // Autoformat markdown syntax to elements (**, #(n))
    createAutoformatPlugin({
      options: {
        rules: [
          ...autoformatSmartQuotes,
          ...autoformatPunctuation,
          ...autoformatLegal,
          ...autoformatLegalHtml,
          ...autoformatArrow,
          ...autoformatMath,
          ...optionsAutoFormatRule,
          {
            mode: 'block',
            type: ELEMENT_HR,
            match: ['---', '—-', '___ '],
            format: (editor) => {
              setNodes(editor, { type: ELEMENT_HR });
              insertNodes(editor, {
                type: ELEMENT_DEFAULT,
                children: [{ text: '' }],
              });
            },
          },
        ],
      },
    }),
    createDndPlugin(),
    createMediaEmbedPlugin(),
    // createBlurSelectionPlugin() as PlatePlugin<PEditor>,

    // createNodeIdPlugin(optionsCreateNodeIdPlugin),
    // // mex custom plugins
    // createTagPlugin(),
    createQuickLinkPlugin(),
    // createSyncBlockPlugin(),
    // createInlineBlockPlugin(),
    // createExcalidrawPlugin({
    //   component: ExcalidrawElement,
    // }),

    // createSelectOnBackspacePlugin(optionsSelectOnBackspacePlugin),
  ];

  return Plugins;
};

const useMemoizedPlugins = () => {
  return createPlugins(generatePlugins(), {
    components: createPlateUI(),
    // components: withStyledPlaceHolders(withStyledDraggables(components)),
  });
};

export default useMemoizedPlugins;
