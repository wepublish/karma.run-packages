import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Default as DefaultImage} from '../data/image.stories'
import {Card} from './card'

export default {
  component: Card,
  title: 'Atoms|Card',
  decorators: [centerLayoutDecorator(0.5)]
}

export const Standard = () => (
  <Card>
    <DefaultImage />
  </Card>
)
