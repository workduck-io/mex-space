import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { LongContent } from '../../StorybookHelpers/StorybookHelpers'
import SplitView from './SplitView'
import { SplitType } from './SplitView.types'

export default {
  component: SplitView,
  argTypes: {}
} as ComponentMeta<typeof SplitView>

export const Base: ComponentStory<typeof SplitView> = (args) => <SplitView {...args} />
Base.args = {
  id: 'split-view-story',
  children: (
    <div style={{ flexGrow: 1 }}>
      <h1>Split View</h1>
      <p>These are the children passed to the component</p>
      <LongContent />
    </div>
  ),
  RenderSplitPreview: () => (
    <div>
      <h1>Split Preview</h1>
      <p>This is the preview, at current width of provided percentages.</p>
      <LongContent />
    </div>
  ),
  splitOptions: {
    type: SplitType.SIDE,
    percent: 33.33
  }
}

export const Full: ComponentStory<typeof SplitView> = Base.bind({})
Full.args = {
  ...Base.args,
  id: 'split-view-story-full',
  splitOptions: {
    ...Base.args.splitOptions,
    type: SplitType.FULL
  }
}

export const None: ComponentStory<typeof SplitView> = Base.bind({})
None.args = {
  ...Base.args,
  id: 'split-view-story-none',
  splitOptions: {
    ...Base.args.splitOptions,
    type: SplitType.NONE
  }
}
