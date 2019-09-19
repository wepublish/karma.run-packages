import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {AddBlockMenu} from './addBlockMenu'
import {IconType} from '../atoms/icon'

export default {
  component: AddBlockMenu,
  title: 'Organisms|AddBlockMenu',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => (
  <AddBlockMenu
    menuItems={[
      {id: 'text', icon: IconType.Text, label: 'Text'},
      {id: 'image', icon: IconType.Image, label: 'Image'},
      {id: 'slideshow', icon: IconType.Gallery, label: 'Slideshow'},
      {id: 'video', icon: IconType.Video, label: 'Video'},
      {id: 'embed', icon: IconType.Embed, label: 'Embed'},
      {id: 'quote', icon: IconType.Quote, label: 'Quote'}
    ]}
    onMenuItemClick={item => {}}
  />
)
