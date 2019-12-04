import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Chip} from './chip'
import {MaterialIconClose} from '@karma.run/icons'

export default {
  component: Chip,
  title: 'Data|Chip',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <Chip
    label="Default"
    imageURL="https://dummyimage.com/300x200/ccc/000"
    icon={MaterialIconClose}
  />
)
