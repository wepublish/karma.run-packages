import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {PanelSection} from './panelSection'
import {Text} from '../layout/typography.stories'

export default {
  component: PanelSection,
  title: 'Panel|PanelSection',
  decorators: [centerLayoutDecorator(0.5)]
}

export const Default = () => (
  <PanelSection>
    <Text />
  </PanelSection>
)

export const Dark = () => (
  <PanelSection dark>
    <Text />
  </PanelSection>
)
