import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Image, ImagePlaceholder} from './image'

export default {
  component: Image,
  title: 'Data|Image',
  decorators: [centerLayoutDecorator()]
}

export const Default = () => (
  <Image
    src="https://dummyimage.com/300x200/333/fff"
    imageWidth={300}
    imageHeight={200}
    width="100%"
  />
)

export const Placeholder = () => <ImagePlaceholder width={300} height={300} />
