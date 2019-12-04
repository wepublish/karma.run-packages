import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Default as DefaultImage} from './image.stories'
import {Card} from './card'

export default {
  component: Card,
  title: 'Data|Card',
  decorators: [centerLayoutDecorator(0.5)]
}

export const Standard = () => (
  <Card width="100%">
    <DefaultImage />
  </Card>
)
