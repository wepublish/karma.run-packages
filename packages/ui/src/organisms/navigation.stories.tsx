import React from 'react'

import {
  MaterialIconInsertDriveFileOutlined,
  MaterialIconPowerSettingsNew,
  MaterialIconTextFields,
  MaterialIconPermMediaOutlined,
  MaterialIconSpellcheck,
  MaterialIconNavigationOutlined
} from '@karma.run/icons'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Navigation} from './navigation'
import {MenuIconButton} from '../atoms/menuIconButton'

export default {
  component: Navigation,
  title: 'Organisms|Navigation',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <Navigation>
    <MenuIconButton icon={MaterialIconTextFields} label={'Article'} />
    <MenuIconButton icon={MaterialIconInsertDriveFileOutlined} label={'Pages'} />
    <MenuIconButton icon={MaterialIconPermMediaOutlined} label={'Media Library'} />
    <MenuIconButton icon={MaterialIconSpellcheck} label={'Proofreading'} />
    <MenuIconButton icon={MaterialIconNavigationOutlined} label={'Menu'} />
    <MenuIconButton icon={MaterialIconPowerSettingsNew} label={'Logout'} />
  </Navigation>
)
