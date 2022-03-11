import {
  createNodesHOC,
  isCollapsed,
  useEditorState,
} from '@udecode/plate-core';
import { ReactEditor, useFocused, useSelected } from 'slate-react';

import Block from './Block';
import { BlockOptionProps } from './types';
import { Editor } from 'slate';
import React, { useMemo } from 'react';
import { useTheme } from 'styled-components';
import { transparentize } from 'polished';
import useBlockStore, { BlockType } from '../../../store/blocks';
import { isFlowBlock } from '../../../utils/helper';

const BlockView = (props: BlockOptionProps) => {
  const { children, element } = props;

  const isBlockMode = useBlockStore((store) => store.isBlockMode);

  const theme = useTheme();
  const focused = useFocused();
  const selected = useSelected();
  const editor = useEditorState();

  const elementStyles = {
    borderRadius: theme.borderRadius.tiny,
    margin: '4px 0',
    backgroundColor:
      selected &&
      !isCollapsed(editor.selection) &&
      focused &&
      transparentize(0.05, theme.colors.background.highlight),
  };

  const path = useMemo(
    () => element && ReactEditor.findPath(editor, element),
    [editor, element]
  );
  const isBlock = path?.length === 1;

  const isFlowLinkPresent = element && isFlowBlock(element);

  if (!element || !isBlockMode || !isBlock || isFlowLinkPresent)
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        style: elementStyles,
        className: child.props.className,
        nodeProps: {
          ...props.nodeProps,
        },
      });
    });

  const isEmptyBlock = Editor.isEmpty(editor, element);

  return (
    <Block
      isBlock={isBlock}
      isEmpty={isEmptyBlock}
      blockId={element?.['id']}
      block={element as BlockType}
    >
      {children}
    </Block>
  );
};

const withBlockView = createNodesHOC(BlockView);

export default withBlockView;
