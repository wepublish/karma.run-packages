import React from 'react'
import {MaterialIconFileCopyOutlined, MaterialIconArchiveOutlined} from '@karma.run/icons'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {OptionMenu} from './optionMenu'

export default {
  component: OptionMenu,
  title: 'Organisms|OptionMenu',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => (
  <OptionMenu
    menuItems={[
      {id: 'copy', icon: MaterialIconFileCopyOutlined, label: 'Copy'},
      {id: 'archive', icon: MaterialIconArchiveOutlined, label: 'Archive'}
    ]}
    onMenuItemClick={item => {}}
  />
)
