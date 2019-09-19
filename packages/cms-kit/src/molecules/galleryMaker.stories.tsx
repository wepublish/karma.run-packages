import React from 'react'

import {storiesOf} from '@storybook/react'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {GalleryMaker} from './galleryMaker'

storiesOf('Molecules|GalleryMaker', module)
  .addDecorator(centerLayoutDecorator())
  .add('default', () => (
    <GalleryMaker images={GalleryMakerImages} onUpdate={() => {}} onRemove={() => {}} />
  ))

export const GalleryMakerImages = [
  {id: 'banana', src: 'https://dummyimage.com/100x68/999/fff', name: 'Banana.jpg'},
  {id: 'flower', src: 'https://dummyimage.com/100x68/ba37ba/fff', name: 'flower.jpg'},
  {id: 'mountains', src: 'https://dummyimage.com/100x68/ff37ba/000', name: 'mountains.jpg'},
  {id: 'fl2', src: 'https://dummyimage.com/100x68/ba37ba/000', name: 'flower2.jpg'}
]
