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
import {MenuButton} from '../buttons/menuButton'

export default {
  component: Navigation,
  title: 'Navigation|Navigation',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <Navigation>
    <MenuButton icon={MaterialIconTextFields} label={'Article'} />
    <MenuButton icon={MaterialIconInsertDriveFileOutlined} label={'Pages'} />
    <MenuButton icon={MaterialIconPermMediaOutlined} label={'Media Library'} />
    <MenuButton icon={MaterialIconSpellcheck} label={'Proofreading'} />
    <MenuButton icon={MaterialIconNavigationOutlined} label={'Menu'} />
    <MenuButton icon={MaterialIconPowerSettingsNew} label={'Logout'} />
  </Navigation>
)
