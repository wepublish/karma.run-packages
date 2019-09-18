import React, {useState} from 'react'

import {storiesOf} from '@storybook/react'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {IconType} from '../atoms/icon'
import {OverlayMenu, MenuItem} from './overlayMenu'

storiesOf('Molecules|OverlayMenu', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => <OverlayMenu inline={false} menuItems={mockArticleBlockSelectors} />)
  .add('inline', () => <OverlayMenu inline={true} menuItems={mockOptionMenuItems} />)

// FrontBlockSelectors
export const mockArticleBlockSelectors: MenuItem[] = [
  {id: 'text', icon: IconType.Text, label: 'Text', onClick: (id: string) => {}},
  {id: 'image', icon: IconType.Image, label: 'Image', onClick: (id: string) => {}},
  {id: 'slideshow', icon: IconType.Gallery, label: 'Slideshow', onClick: (id: string) => {}},
  {id: 'video', icon: IconType.Video, label: 'Video', onClick: (id: string) => {}},
  {id: 'embed', icon: IconType.Embed, label: 'Embed', onClick: (id: string) => {}},
  {id: 'quote', icon: IconType.Quote, label: 'Quote', onClick: (id: string) => {}}
]

export const mockOptionMenuItems = [
  {id: 'copy', icon: IconType.Copy, label: 'Copy', onClick: (id: string) => {}},
  {id: 'archive', icon: IconType.Archive, label: 'Archive', onClick: (id: string) => {}}
]
