import React from 'react'

import {NavigationButton, NavigationLinkButton} from './navigationButton'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {MaterialIconSaveOutlined} from '@karma.run/icons'
import {Spacing} from '../style/helpers'
import {Box} from '../layout/box'

export default {
  component: NavigationButton,
  title: 'Buttons|NavigationButton',
  decorators: [centerLayoutDecorator()]
}

export const Default = () => (
  <Box display="flex" flexDirection="row">
    <NavigationButton icon={MaterialIconSaveOutlined} label="Default" margin={Spacing.Tiny} />
    <NavigationButton icon={MaterialIconSaveOutlined} label="Active" margin={Spacing.Tiny} active />
    <NavigationButton
      icon={MaterialIconSaveOutlined}
      label="Disabled"
      disabled
      margin={Spacing.Tiny}
    />
    <NavigationLinkButton
      href="#"
      icon={MaterialIconSaveOutlined}
      label="Link"
      margin={Spacing.Tiny}
    />
  </Box>
)
