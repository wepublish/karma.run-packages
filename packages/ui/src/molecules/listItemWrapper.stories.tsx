import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {ListItemWrapper} from './listItemWrapper'

export default {
  component: ListItemWrapper,
  title: 'Molecules|ListItemWrapper',
  decorators: [centerLayoutDecorator(0.8)]
}

export const Standard = () => (
  <ListItemWrapper onDelete={() => {}} onMoveUp={() => {}} onMoveDown={() => {}} />
)
