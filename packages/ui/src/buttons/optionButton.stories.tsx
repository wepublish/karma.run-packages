import React from 'react'
import {MaterialIconFileCopyOutlined, MaterialIconDeleteOutlined} from '@karma.run/icons'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {AddBlockInput} from './optionButton'

export default {
  component: AddBlockInput,
  title: 'Buttons|OptionButton',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <AddBlockInput
    menuItems={[
      {id: 'delete', icon: MaterialIconDeleteOutlined, label: 'Delete'},
      {id: 'copy', icon: MaterialIconFileCopyOutlined, label: 'Copy'}
    ]}
    onMenuItemClick={item => {}}
  />
)

export const PositionLeft = () => (
  <AddBlockInput
    position="left"
    menuItems={[
      {id: 'delete', icon: MaterialIconDeleteOutlined, label: 'Delete'},
      {id: 'copy', icon: MaterialIconFileCopyOutlined, label: 'Copy'}
    ]}
    onMenuItemClick={item => {}}
  />
)
