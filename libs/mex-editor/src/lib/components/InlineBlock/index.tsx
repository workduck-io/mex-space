import React from 'react'
import { useContentStore } from '../../../store/useContentStore'
import { useLinks } from '../../../hooks/useLinks'
import {
  FlexBetween,
  InlineBlockHeading,
  Chip,
  InlineBlockText,
  InlineFlex,
  StyledInlineBlock,
  StyledInlineBlockPreview
} from './styled'
import EditorPreviewRenderer from '../../utils/EditorPreviewRenderer'
import { useNavigation } from '../../../hooks/useNavigation'
import { RootElement } from '../SyncBlock'
import { useSelected } from 'slate-react'
import { useSaver } from '../Saver'
import useArchive from '../../../hooks/useArchive'
import styled from 'styled-components'

const StyledArchiveText = styled.text`
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: 4px 8px;
  color: #df7777;
`

const InlineBlock = (props: any) => {
  const { push } = useNavigation()
  const { getUidFromNodeId } = useLinks()
  const uid = getUidFromNodeId(props.element.value)
  const getContent = useContentStore((store) => store.getContent)
  const content = getContent(uid)
  const selected = useSelected()
  const { onSave } = useSaver()
  const { archived } = useArchive()

  const openNode = (ev: any) => {
    ev.preventDefault()
    onSave()
    push(uid)
  }

  return (
    <RootElement {...props.attributes}>
      <div contentEditable={false}>
        <StyledInlineBlock selected={selected} data-tour="mex-onboarding-inline-block">
          <FlexBetween>
            <InlineFlex>
              <InlineBlockHeading>From:</InlineBlockHeading>
              <InlineBlockText>{props.element.value}</InlineBlockText>
            </InlineFlex>
            {archived(uid) ? <StyledArchiveText>Archived</StyledArchiveText> : <Chip onClick={openNode}>Open</Chip>}
          </FlexBetween>
          {!archived(uid) && (
            <StyledInlineBlockPreview>
              {content && <EditorPreviewRenderer content={content && content.content} editorId={`__preview__${uid}`} />}
            </StyledInlineBlockPreview>
          )}
        </StyledInlineBlock>
      </div>
      {props.children}
    </RootElement>
  )
}

export default InlineBlock
