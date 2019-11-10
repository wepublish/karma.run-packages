import React from 'react'

import {NavigationButton, NavigationLinkButton} from './navigationButton'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {MaterialIconSaveOutlined} from '@karma.run/icons'
import {Spacing} from '../style/helpers'
import {Box} from '../layout/box'

export default {
  component: NavigationButton,
  title: 'Input|Buttons/NavigationButton',
  decorators: [centerLayoutDecorator()]
}

export const Default = () => (
  <Box flex flexDirection="row">
    <Box margin={Spacing.Tiny}>
      <NavigationButton icon={MaterialIconSaveOutlined} label="Default" />
    </Box>
    <Box margin={Spacing.Tiny}>
      <NavigationButton icon={MaterialIconSaveOutlined} label="Disabled" disabled />
    </Box>
    <Box margin={Spacing.Tiny}>
      <NavigationLinkButton href="#" icon={MaterialIconSaveOutlined} label="Link" />
    </Box>
  </Box>
)
