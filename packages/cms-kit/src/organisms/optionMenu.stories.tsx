import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {OptionMenu} from './optionMenu'
import {IconType} from '../atoms/icon'

export default {
  component: OptionMenu,
  title: 'Organisms|OptionMenu',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => (
  <OptionMenu
    menuItems={[
      {id: 'copy', icon: IconType.Copy, label: 'Copy'},
      {id: 'archive', icon: IconType.Archive, label: 'Archive'}
    ]}
    onMenuItemClick={item => {}}
  />
)
