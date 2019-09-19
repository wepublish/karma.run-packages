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
    {isCollapsed => (
      <>
        <MenuIconButton icon={IconType.Article} label={'Article'} hideLabel={isCollapsed} />
        <MenuIconButton icon={IconType.Page} label={'Pages'} hideLabel={isCollapsed} />
        <MenuIconButton
          icon={IconType.MediaLibrary}
          label={'Media Library'}
          hideLabel={isCollapsed}
        />
        <MenuIconButton
          icon={IconType.Proofreading}
          label={'Proofreading'}
          hideLabel={isCollapsed}
        />
        <MenuIconButton icon={IconType.Menu} label={'Menu'} hideLabel={isCollapsed} />
        <MenuIconButton icon={IconType.Logout} label={'Logout'} hideLabel={isCollapsed} />
      </>
    )}
  </Navigation>
)
