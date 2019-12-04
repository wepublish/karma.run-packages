import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Menu} from './menu'

import {
  MaterialIconTextFormat,
  MaterialIconImage,
  MaterialIconFilter,
  MaterialIconMovie,
  MaterialIconCode,
  MaterialIconFormatQuote,
  MaterialIconFileCopy,
  MaterialIconArchive
} from '@karma.run/icons'

export default {
  component: Menu,
  title: 'Navigation|Menu',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <Menu
    inline={false}
    items={[
      {id: 'text', icon: MaterialIconTextFormat, label: 'Text'},
      {id: 'image', icon: MaterialIconImage, label: 'Image'},
      {id: 'slideshow', icon: MaterialIconFilter, label: 'Slideshow'},
      {id: 'video', icon: MaterialIconMovie, label: 'Video'},
      {id: 'embed', icon: MaterialIconCode, label: 'Embed'},
      {id: 'quote', icon: MaterialIconFormatQuote, label: 'Quote'}
    ]}
    onItemClick={item => {}}
  />
)

export const Inline = () => (
  <Menu
    inline={true}
    items={[
      {id: 'copy', icon: MaterialIconFileCopy, label: 'Copy'},
      {id: 'archive', icon: MaterialIconArchive, label: 'Archive'}
    ]}
    onItemClick={item => {}}
  />
)
