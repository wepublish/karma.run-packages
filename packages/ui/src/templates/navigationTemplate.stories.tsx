import React from 'react'

import {
  MaterialIconInsertDriveFileOutlined,
  MaterialIconPowerSettingsNew,
  MaterialIconTextFields,
  MaterialIconPermMediaOutlined,
  MaterialIconSpellcheck,
  MaterialIconNavigationOutlined
} from '@karma.run/icons'

import {Text} from '../layout/typography.stories'
import {NavigationTemplate} from './navigationTemplate'
import {MenuButton} from '../buttons/menuButton'

export default {
  component: NavigationTemplate,
  title: 'Templates|NavigationTemplate'
}

export const Standard = () => (
  <NavigationTemplate
    navigationChildren={
      <>
        <MenuButton icon={MaterialIconTextFields} label={'Article'} />
        <MenuButton icon={MaterialIconInsertDriveFileOutlined} label={'Pages'} />
        <MenuButton icon={MaterialIconPermMediaOutlined} label={'Media Library'} />
        <MenuButton icon={MaterialIconSpellcheck} label={'Proofreading'} />
        <MenuButton icon={MaterialIconNavigationOutlined} label={'Menu'} />
        <MenuButton icon={MaterialIconPowerSettingsNew} label={'Logout'} />
      </>
    }>
    <Text />
    <Text />
    <Text />
  </NavigationTemplate>
)
