import React from 'react'

import {storiesOf} from '@storybook/react'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {ImageUpload} from './imageUpload'

storiesOf('Molecules|ImageUpload', module)
  .addDecorator(centerLayoutDecorator(0.4))
  .add('empty', () => <ImageUpload images={[]} isProcessing={false} onDeleteImage={id => {}} />)
  .add('upload all', () => (
    <ImageUpload images={mockThumbImages} isProcessing={false} onDeleteImage={id => {}} />
  ))
  .add('in process', () => (
    <ImageUpload images={mockThumbImages} isProcessing={true} onDeleteImage={id => {}} />
  ))

export const mockThumbImages = [
  {id: 'banana', src: 'https://dummyimage.com/100x68/000/fff', size: '1.1MB', name: 'Banana.jpg'},
  {id: 'flower', src: 'https://dummyimage.com/100x68/ba37ba/fff', size: '1.5MB', name: 'flower.jpg'}
]
