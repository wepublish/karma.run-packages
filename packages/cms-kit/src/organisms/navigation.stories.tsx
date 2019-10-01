import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {IconType} from '../atoms/icon'
import {Navigation} from './navigation'
import {MenuIconButton} from '../atoms/menuIconButton'

export default {
  component: Navigation,
  title: 'Organisms|Navigation',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <Navigation>
    <MenuIconButton icon={IconType.Article} label={'Article'} />
    <MenuIconButton icon={IconType.Page} label={'Pages'} />
    <MenuIconButton icon={IconType.MediaLibrary} label={'Media Library'} />
    <MenuIconButton icon={IconType.Proofreading} label={'Proofreading'} />
    <MenuIconButton icon={IconType.Menu} label={'Menu'} />
    <MenuIconButton icon={IconType.Logout} label={'Logout'} />
  </Navigation>
)
