import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Card} from './card'
import {randomImageURL} from '../.storybook/util'
import {Image} from './image'

export default {
  component: Card,
  title: 'Data|Card',
  decorators: [centerLayoutDecorator(0.5)]
}

export const Standard = () => (
  <Card width="100%" overflow="hidden">
    <Image src={randomImageURL(400, 200)} imageWidth={400} imageHeight={200} width="100%" />
  </Card>
)
