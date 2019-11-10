import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Text} from '../layout/typography.stories'
import {Default as DefaultPanelHeader} from './panelHeader.stories'
import {Default as DefaultFocalPointInput} from '../input/focalPointInput.stories'
import {Default as DefaultDescriptionList} from '../data/descriptionList.stories'

import {Panel} from './panel'
import {PanelSectionHeader} from './panelSectionHeader'
import {PanelSection} from './panelSection'
import {Box} from '../layout/box'
import {Spacing} from '../style/helpers'

export default {
  component: Panel,
  title: 'Panel|Panel',
  decorators: [centerLayoutDecorator(0.5)]
}

export const Default = () => (
  <Panel>
    <DefaultPanelHeader />
    <PanelSection>
      <Text />
    </PanelSection>
    <PanelSectionHeader title="Section Header #1" />
    <PanelSection dark>
      <Box marginBottom={Spacing.ExtraSmall}>
        <DefaultFocalPointInput />
      </Box>
      <DefaultDescriptionList />
    </PanelSection>
    <PanelSectionHeader title="Section Header #2" />
    <PanelSection>
      <Text />
    </PanelSection>
  </Panel>
)
