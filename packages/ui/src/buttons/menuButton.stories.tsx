import React from 'react'
import {MenuButton, MenuLinkButton} from './menuButton'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {MaterialIconHome} from '@karma.run/icons'
import {Box} from '../layout/box'
import {Spacing} from '../style/helpers'

export default {
  component: MenuButton,
  title: 'Buttons|MenuButton',
  decorators: [centerLayoutDecorator()]
}

export const Default = () => (
  <Box display="flex" flexDirection="column">
    <MenuButton icon={MaterialIconHome} label={'Default'} margin={Spacing.Tiny} />
    <MenuButton icon={MaterialIconHome} label={'Active'} active margin={Spacing.Tiny} />
    <MenuButton icon={MaterialIconHome} label={'Disabled'} disabled margin={Spacing.Tiny} />
    <MenuLinkButton href="#" icon={MaterialIconHome} label={'Link'} margin={Spacing.Tiny} />
  </Box>
)
