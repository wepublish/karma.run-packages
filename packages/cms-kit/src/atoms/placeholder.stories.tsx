import React from 'react'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {Placeholder} from './placeholder'

export default {
  component: Placeholder,
  title: 'Atoms|Placeholder',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => <Placeholder></Placeholder>
