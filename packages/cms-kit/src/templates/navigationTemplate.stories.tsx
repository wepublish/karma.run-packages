import React from 'react'

import {Text} from '../layout/typography.stories'
import {NavigationTemplate} from './navigationTemplate'
import {MenuIconButton} from '../atoms/menuIconButton'
import {IconType} from '../atoms/icon'

export default {
  component: NavigationTemplate,
  title: 'Templates|NavigationTemplate'
}

export const Standard = () => (
  <NavigationTemplate
    navigationChildren={
      <>
        <MenuIconButton icon={IconType.Article} label={'Article'} />
        <MenuIconButton icon={IconType.Page} label={'Pages'} />
        <MenuIconButton icon={IconType.MediaLibrary} label={'Media Library'} />
        <MenuIconButton icon={IconType.Proofreading} label={'Proofreading'} />
        <MenuIconButton icon={IconType.Menu} label={'Menu'} />
        <MenuIconButton icon={IconType.Logout} label={'Logout'} />
      </>
    }>
    <Text />
    <Text />
    <Text />
  </NavigationTemplate>
)
