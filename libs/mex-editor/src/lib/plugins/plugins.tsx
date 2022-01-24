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
  PEditor,
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
  ELEMENT_PARAGRAPH,
} from '@udecode/plate';

import { withStyledDraggables } from '../wrappers/withDraggable';
import { withStyledPlaceHolders } from '../wrappers/withPlaceholder';
import components from '../components/components';

import {
  createExcalidrawPlugin,
  ELEMENT_EXCALIDRAW,
} from '@udecode/plate-excalidraw';
import { ExcalidrawElement } from '../components/Excalidraw';

import { createILinkPlugin } from '../components/ilink/createILinkPlugin';
import { createInlineBlockPlugin } from '../components/InlineBlock/createInlineBlockPlugin';
import { createSyncBlockPlugin } from '../components/SyncBlock/createSyncBlockPlugin';
import { createTagPlugin } from '../components/tag/createTagPlugin';
import { createBlurSelectionPlugin } from './blurSelection';
import {
  optionsAutoFormatRule,
  optionsCreateNodeIdPlugin,
  optionsExitBreakPlugin,
  optionsResetBlockTypePlugin,
  optionsSelectOnBackspacePlugin,
  optionsSoftBreakPlugin,
} from './pluginOptions';
import TableWrapper from '../components/TableWrapper';

/**
 * Plugin generator
 * @param config Configurations for the plugins, event handlers etc.
 * @returns Array of PlatePlugin
 */
const generatePlugins = () => {
  const Plugins: PlatePlugin[] = [
    // editor

    // elements
    createParagraphPlugin(), // paragraph element
    createBlockquotePlugin(), // blockquote element
    createCodeBlockPlugin(), // code block element
    createHeadingPlugin(), // heading elements

    createExcalidrawPlugin({
      component: ExcalidrawElement,
    }),

    // Marks
    createBoldPlugin(), // bold mark
    createItalicPlugin(), // italic mark
    createUnderlinePlugin(), // underline mark
    createStrikethroughPlugin(), // strikethrough mark
    createCodePlugin(), // code mark
    createHighlightPlugin(), // highlight mark
    createTodoListPlugin(),

    // Special Elements
    createImagePlugin(), // Image
    createLinkPlugin(), // Link
    createListPlugin(), // List
    createTablePlugin({ component: TableWrapper }), // Table

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
    createNodeIdPlugin(optionsCreateNodeIdPlugin),
    createMediaEmbedPlugin(),
    createBlurSelectionPlugin() as PlatePlugin<PEditor>,

    // mex custom plugins
    createTagPlugin(),
    createILinkPlugin(),
    createSyncBlockPlugin(),
    createInlineBlockPlugin(),

    createSelectOnBackspacePlugin(optionsSelectOnBackspacePlugin),
  ];

  return Plugins;
};

const useMemoizedPlugins = () => {
  return createPlugins(generatePlugins(), {
    components: withStyledPlaceHolders(withStyledDraggables(components)),
  });
};

export default useMemoizedPlugins;
