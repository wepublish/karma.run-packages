import React from 'react'
import {MenuIconButton} from './menuIconButton'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {MaterialIconHome} from '@karma.run/icons'

export default {
  component: MenuIconButton,
  title: 'Atoms|Buttons/Icon/MenuIconButton',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <MenuIconButton icon={MaterialIconHome} label={'Label'} />
