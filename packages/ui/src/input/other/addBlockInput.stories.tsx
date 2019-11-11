import React from 'react'

import {centerLayoutDecorator} from '../../.storybook/decorators'
import {AddBlockInput} from './addBlockInput'

import {
  MaterialIconTextFormat,
  MaterialIconImage,
  MaterialIconFilter,
  MaterialIconMovie,
  MaterialIconCode,
  MaterialIconFormatQuote
} from '@karma.run/icons'

export default {
  component: AddBlockInput,
  title: 'Input|Other/AddBlockInput',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => (
  <AddBlockInput
    menuItems={[
      {id: 'text', icon: MaterialIconTextFormat, label: 'Text'},
      {id: 'image', icon: MaterialIconImage, label: 'Image'},
      {id: 'gallery', icon: MaterialIconFilter, label: 'Gallery'},
      {id: 'video', icon: MaterialIconMovie, label: 'Video'},
      {id: 'embed', icon: MaterialIconCode, label: 'Embed'},
      {id: 'quote', icon: MaterialIconFormatQuote, label: 'Quote'}
    ]}
    onMenuItemClick={item => {}}
  />
)
