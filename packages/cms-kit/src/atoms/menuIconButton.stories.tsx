import React from 'react'
import {MenuIconButton} from './menuIconButton'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {IconType} from './icon'

export default {
  component: MenuIconButton,
  title: 'Atoms|Buttons/Icon/MenuIconButton',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <MenuIconButton icon={IconType.Replace} label={'Label'} />
