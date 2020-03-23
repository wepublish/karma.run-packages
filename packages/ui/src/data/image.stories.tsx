import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {randomImageURL} from '../.storybook/util'
import {Image, PlaceholderImage} from './image'

export default {
  component: Image,
  title: 'Data|Image',
  decorators: [centerLayoutDecorator()]
}

export const Default = () => (
  <Image src={randomImageURL(300, 200)} imageWidth={300} imageHeight={200} width="100%" />
)

export const Placeholder = () => <PlaceholderImage width={300} height={200} />
