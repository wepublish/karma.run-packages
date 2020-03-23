import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Avatar} from './avatar'
import {Image, PlaceholderImage} from './image'
import {randomImageURL} from '../.storybook/util'

export default {
  component: Avatar,
  title: 'Data|Avatar',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <Avatar width={100} height={100}>
    <Image src={randomImageURL(300, 200)} width="100%" height="100%" />
  </Avatar>
)

export const Placeholder = () => (
  <Avatar width={100} height={100}>
    <PlaceholderImage width="100%" height="100%" />
  </Avatar>
)
