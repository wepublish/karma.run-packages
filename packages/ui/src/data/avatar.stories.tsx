import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Avatar} from './avatar'
import {Image, ImagePlaceholder} from './image'

export default {
  component: Avatar,
  title: 'Data|Avatar',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <Avatar width={100} height={100}>
    <Image src="https://dummyimage.com/300x200/333/fff" width="100%" height="100%" />
  </Avatar>
)

export const Placeholder = () => (
  <Avatar width={100} height={100}>
    <ImagePlaceholder width="100%" height="100%" />
  </Avatar>
)
