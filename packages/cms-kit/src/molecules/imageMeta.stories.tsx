import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {FocalPointSetter, ImageMeta, File} from './imageMeta'

export default {
  component: ImageMeta,
  title: 'Molecules|ImageMeta',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <ImageMeta file={mockImage} />

const mockImage: File = {
  src: 'https://dummyimage.com/440x290/ba37ba/fff',
  width: 440,
  height: 290,
  name: 'forest.jpg',
  date: '01.08',
  size: 1400,
  link: 'sldkfjsldkf'
}
