import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Chip} from './chip'
import {MaterialIconClose} from '@karma.run/icons'
import {randomImageURL} from '../.storybook/util'

export default {
  component: Chip,
  title: 'Data|Chip',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <Chip label="Default" imageURL={randomImageURL(50, 50)} icon={MaterialIconClose} />
)
