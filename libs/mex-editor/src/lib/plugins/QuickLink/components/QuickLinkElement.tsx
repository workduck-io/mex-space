import { Icon } from '@iconify/react';
import { useEditorRef } from '@udecode/plate';
import { Transforms } from 'slate';
import { useFocused, useSelected } from 'slate-react';
import styled from 'styled-components';
import { useHotkeys } from '../../../hooks/useHotKeys';
import { useOnMouseClick } from '../../../hooks/useOnMouseClick';
import { SILink, SILinkRoot } from './QuickLinkElement.styles';
import { ILinkElementProps, ILinkProps } from './QuickLink.types';
import React from 'react';

const StyledIcon = styled(Icon)`
  margin-right: 4px;
`;
export const QuickLinkElement = ({
  attributes,
  children,
  element,
  isArchived,
  nodeid,
  onClick,
  showPreview,
  archivedIcon,
}: ILinkProps) => {
  const editor = useEditorRef();
  const selected = useSelected();
  const focused = useFocused();

  useHotkeys(
    'backspace',
    () => {
      if (selected && focused && editor.selection) {
        Transforms.move(editor);
      }
    },
    [selected, focused]
  );

  const onClickProps = useOnMouseClick(() => {
    onClick();
  });

  useHotkeys(
    'delete',
    () => {
      if (selected && focused && editor.selection) {
        Transforms.move(editor, { reverse: true });
      }
    },
    [selected, focused]
  );

  return (
    <SILinkRoot
      {...attributes}
      id={`ILINK_${element.value}`}
      data-tour="mex-onboarding-ilink"
      data-slate-value={element.value}
      contentEditable={false}
    >
      {isArchived ? (
        <SILink focused={selected} archived={true}>
          <StyledIcon icon={archivedIcon} color="#df7777" />
          <span className="ILink_decoration ILink_decoration_left">[[</span>
          <span className="ILink_decoration ILink_decoration_value">
            {' '}
            {element.value}
          </span>
          <span className="ILink_decoration ILink_decoration_right">]]</span>
        </SILink>
      ) : (
        // <EditorPreview
        //   isPreview={isPreview(editor.id)}
        //   previewRef={editor}
        //   nodeid={nodeid}
        // >
        <SILink focused={selected} {...onClickProps}>
          <span className="ILink_decoration ILink_decoration_left">[[</span>
          <span className="ILink_decoration ILink_decoration_value">
            {' '}
            {element.value}
          </span>
          <span className="ILink_decoration ILink_decoration_right">]]</span>
        </SILink>
        // </EditorPreview>
      )}
      {children}
    </SILinkRoot>
  );
};

const isPreview = (id: string) => id.startsWith('__preview__');
