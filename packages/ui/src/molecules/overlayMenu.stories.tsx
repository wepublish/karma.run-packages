import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {OverlayMenu} from './overlayMenu'

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
  component: OverlayMenu,
  title: 'Molecules|OverlayMenu',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <OverlayMenu
    inline={false}
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

export const Inline = () => (
  <OverlayMenu
    inline={true}
    menuItems={[
      {id: 'copy', icon: MaterialIconFileCopy, label: 'Copy'},
      {id: 'archive', icon: MaterialIconArchive, label: 'Archive'}
    ]}
    onMenuItemClick={item => {}}
  />
)
