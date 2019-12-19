import React from 'react'
import {MaterialIconFileCopyOutlined, MaterialIconDeleteOutlined} from '@karma.run/icons'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {OptionButton} from './optionButton'

export default {
  component: OptionButton,
  title: 'Buttons|OptionButton',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <OptionButton
    menuItems={[
      {id: 'delete', icon: MaterialIconDeleteOutlined, label: 'Delete'},
      {id: 'copy', icon: MaterialIconFileCopyOutlined, label: 'Copy'}
    ]}
    onMenuItemClick={item => {}}
  />
)

export const PositionLeft = () => (
  <OptionButton
    position="left"
    menuItems={[
      {id: 'delete', icon: MaterialIconDeleteOutlined, label: 'Delete'},
      {id: 'copy', icon: MaterialIconFileCopyOutlined, label: 'Copy'}
    ]}
    onMenuItemClick={item => {}}
  />
)
