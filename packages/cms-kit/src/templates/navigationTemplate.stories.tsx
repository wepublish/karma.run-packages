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
import {MenuIconButton} from '../atoms/menuIconButton'

export default {
  component: NavigationTemplate,
  title: 'Templates|NavigationTemplate'
}

export const Standard = () => (
  <NavigationTemplate
    navigationChildren={
      <>
        <MenuIconButton icon={MaterialIconTextFields} label={'Article'} />
        <MenuIconButton icon={MaterialIconInsertDriveFileOutlined} label={'Pages'} />
        <MenuIconButton icon={MaterialIconPermMediaOutlined} label={'Media Library'} />
        <MenuIconButton icon={MaterialIconSpellcheck} label={'Proofreading'} />
        <MenuIconButton icon={MaterialIconNavigationOutlined} label={'Menu'} />
        <MenuIconButton icon={MaterialIconPowerSettingsNew} label={'Logout'} />
      </>
    }>
    <Text />
    <Text />
    <Text />
  </NavigationTemplate>
)
