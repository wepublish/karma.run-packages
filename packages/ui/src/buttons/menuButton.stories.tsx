import React from 'react'
import {MenuButton} from './menuButton'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {MaterialIconHome} from '@karma.run/icons'

export default {
  component: MenuButton,
  title: 'Buttons|MenuButton',
  decorators: [centerLayoutDecorator()]
}

export const Default = () => <MenuButton icon={MaterialIconHome} label={'Label'} />
