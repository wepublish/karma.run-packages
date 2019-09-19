import React from 'react'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {Card} from './card'

export default {
  component: Card,
  title: 'Atoms|Card',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <Card>Hello World</Card>
