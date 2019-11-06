import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {PanelSectionHeader} from './panelSectionHeader'

export default {
  component: PanelSectionHeader,
  title: 'Panel|PanelSectionHeader',
  decorators: [centerLayoutDecorator(0.5)]
}

export const Default = () => <PanelSectionHeader title="Title" />
