import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {AddBlockMenu} from './addBlockMenu'

import {
  MaterialIconTextFormat,
  MaterialIconImage,
  MaterialIconFilter,
  MaterialIconMovie,
  MaterialIconCode,
  MaterialIconFormatQuote
} from '@karma.run/icons'

export default {
  component: AddBlockMenu,
  title: 'Organisms|AddBlockMenu',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => (
  <AddBlockMenu
    menuItems={[
      {id: 'text', icon: MaterialIconTextFormat, label: 'Text'},
      {id: 'image', icon: MaterialIconImage, label: 'Image'},
      {id: 'slideshow', icon: MaterialIconFilter, label: 'Slideshow'},
      {id: 'video', icon: MaterialIconMovie, label: 'Video'},
      {id: 'embed', icon: MaterialIconCode, label: 'Embed'},
      {id: 'quote', icon: MaterialIconFormatQuote, label: 'Quote'}
    ]}
    onMenuItemClick={item => {}}
  />
)
