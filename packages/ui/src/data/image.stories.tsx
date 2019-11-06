import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'

import {Image} from './image'
import {Box} from '../layout/box'

export default {
  component: Image,
  title: 'Data|Image',
  decorators: [centerLayoutDecorator(0.5)]
}

export const Default = () => (
  <Box height={200}>
    <Image src="https://dummyimage.com/300x200/fff/000" width={300} height={200} />
  </Box>
)
